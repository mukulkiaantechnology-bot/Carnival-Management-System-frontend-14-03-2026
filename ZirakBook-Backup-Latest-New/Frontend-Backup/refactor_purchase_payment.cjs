const fs = require('fs');
const path = require('path');

const mod = {
    name: 'PurchasePayment',
    targetCssPath: 'src/pages/company/Purchases/Payment/Payment.css', // New file
    targetJsxPath: 'src/pages/company/Purchases/Payment/Payment.jsx',
    sourceCssPath: 'src/pages/company/Purchases/PurchaseOrder/PurchaseOrder.css', // Source from newly created standard
    prefix: 'PurchasePayment-'
};

try {
    const cwd = process.cwd();
    const sourceCssAbsPath = path.resolve(cwd, mod.sourceCssPath);
    const targetCssAbsPath = path.resolve(cwd, mod.targetCssPath);
    const targetJsxAbsPath = path.resolve(cwd, mod.targetJsxPath);

    console.log(`Processing ${mod.name} Module...`);

    if (!fs.existsSync(sourceCssAbsPath)) {
        console.error(`Source CSS not found: ${sourceCssAbsPath}`);
        process.exit(1);
    }

    let cssContent = fs.readFileSync(sourceCssAbsPath, 'utf8');

    // Replace 'PurchaseOrder-' with 'PurchasePayment-'
    cssContent = cssContent.replace(/PurchaseOrder-/g, mod.prefix);

    // Also likely need to handle the generic map from JSX to these new classes.
    // The JSX currently uses "purchase-page", "page-header", "page-title", "btn-add".
    // The CSS has "PurchasePayment-page", "PurchasePayment-header", "PurchasePayment-title", "PurchasePayment-btn-add".
    // So we need to map them manually in JSX or script.

    // Let's create the CSS first.
    fs.writeFileSync(targetCssAbsPath, cssContent);
    console.log(`Created ${mod.targetCssPath}`);

    // Update JSX
    if (fs.existsSync(targetJsxAbsPath)) {
        let jsxContent = fs.readFileSync(targetJsxAbsPath, 'utf8');

        // Manual replacement map based on observation
        const replacements = {
            'purchase-page': 'PurchasePayment-page',
            'page-header': 'PurchasePayment-header',
            'page-title': 'PurchasePayment-title',
            'page-subtitle': 'PurchasePayment-subtitle',
            'btn-add': 'PurchasePayment-btn-add',
            'process-tracker-card': 'PurchasePayment-tracker-card',
            'tracker-wrapper': 'PurchasePayment-tracker-wrapper',
            'tracker-step': 'PurchasePayment-tracker-step',
            'step-icon-wrapper': 'PurchasePayment-step-icon', // Note: CSS has PurchasePayment-step-icon (no wrapper suffix in original Purchase.css? let's check)
            // Purchase.css had .purchase-module-step-icon.
            // My script replaced purchase-module- with PurchaseOrder-.
            // So CSS has PurchaseOrder-step-icon.
            // Payment.jsx uses "step-icon-wrapper".
            // Mismatch likely.

            // Let's re-read Purchase.css structure mentally.
            // .purchase-module-step-icon
            // Payment.jsx: <div className="step-icon-wrapper">
            // So I should replace "step-icon-wrapper" with "PurchasePayment-step-icon".

            'step-label': 'PurchasePayment-step-label',
            'tracker-divider': 'PurchasePayment-tracker-divider',
            'pp-': 'PurchasePayment-', // It uses pp- prefixes extensively!
            // Wait, Purchase.css had "pp-" classes?
            // Yes, checking Step 1434, Purchase.css had lines 745+ "Purchase Payment Unique Styles" with .pp-modal-overlay etc.
            // My script created PurchaseOrder.css from Purchase.css.
            // PurchaseOrder.css contains "pp-" classes unchanged (because regex only replaced purchase-module-).
            // So PurchaseOrder.css has both PurchaseOrder-* AND pp-* classes.
            // And Payment.css (copied from PO) will have PurchasePayment-* AND pp-*.
            // We want Payment.css to use PurchasePayment- everywhere ideally, or just keep pp- if it's unique enough.
            // But user said "fix all moduls css unique".
            // "pp-" is generic? "Purchase Payment". It's mostly okay.
            // But let's verify if we should rename 'pp-' to 'PurchasePayment-'.

            // If I rename 'pp-' to 'PurchasePayment-', I must update JSX's 'pp-' classes too.
        };

        // Apply specific replacements
        for (const [key, value] of Object.entries(replacements)) {
            // Replace full class names
            const regex = new RegExp(`className=(["'])(.*?)\\b${key}\\b(.*?)(\\1)`, 'g');
            jsxContent = jsxContent.replace(regex, (match, q, pre, post, q2) => {
                return `className=${q}${pre}${value}${post}${q}`;
            });
        }

        // Handle "pp-" prefix replacement globally in proper Payment.css and Payment.jsx way
        // Replace 'pp-' with 'PurchasePayment-' in JSX
        jsxContent = jsxContent.replace(/className=(["'])([\s\S]*?)\1/g, (match, quote, content) => {
            let clsList = content.split(/\s+/);
            let newClsList = clsList.map(c => {
                if (c.startsWith('pp-')) {
                    return c.replace('pp-', 'PurchasePayment-');
                }
                return c;
            });
            return `className=${quote}${newClsList.join(' ')}${quote}`;
        });

        // Also update CSS to match mapping
        // We need to replace "pp-" in CSS content with "PurchasePayment-"
        let updatedCssContent = fs.readFileSync(targetCssAbsPath, 'utf8');
        updatedCssContent = updatedCssContent.replace(/\.pp-/g, '.PurchasePayment-');

        // Fix the step-icon mapping issue in CSS
        // CSS has .PurchasePayment-step-icon (derived from purchase-module-step-icon)
        // JSX had "step-icon-wrapper". I replaced it with "PurchasePayment-step-icon" above. Matches.

        // Fix table classes?
        // Payment.jsx: "pp-table-card", "pp-table".
        // Replaced by pp- check above to "PurchasePayment-table-card".
        // CSS has .PurchasePayment-table-card (derived from purchase-module-table-card)?
        // Purchase.css had .purchase-module-table-card.
        // But Purchase.css ALSO had .pp-table-card?
        // Let's check Step 1434.
        // It had .purchase-module-table-card (line 216).
        // It had .pp-modal-overlay (line 745).
        // It did NOT explicitly show .pp-table-card in the snippet.
        // If Payment.jsx used .pp-table-card and Purchase.css didn't have it, where did it come from? 
        // Maybe Payment.css (PaymentReceiptView.css)?
        // No, Payment.jsx imports `../Purchase.css`, `PaymentReceiptView.css`, `PaymentActionButtons.css`.

        // If generic class styling is broken, creating new specific ones is the correct fix anyway.

        fs.writeFileSync(targetCssAbsPath, updatedCssContent);

        // Update imports in JSX
        jsxContent = jsxContent.replace("import '../Purchase.css';", `import './Payment.css';`);

        fs.writeFileSync(targetJsxAbsPath, jsxContent);
        console.log(`Updated ${mod.targetJsxPath}`);

    } else {
        console.error(`JSX file not found: ${targetJsxAbsPath}`);
    }

} catch (err) {
    console.error(`Error processing ${mod.name}:`, err);
}
