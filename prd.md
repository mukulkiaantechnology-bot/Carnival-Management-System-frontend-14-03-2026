Product Requirement Document (PRD)
1. Product Overview

Carnival Management System ek web-based company management platform hai jo carnival / amusement companies ko manage karne ke liye use hoga.

System allow karega company ko manage karne ke liye:

Employees

Inspections

Maintenance

Ticket Sales

Financial tracking

Training

Contracts

Event calendar

Reports

Is system me role based dashboards honge jisme har role ko sirf uske relevant modules dikhenge.

2. Technology Stack

Frontend

React
Tailwind CSS
React Router
Context API / Zustand

Design Goals

Fully responsive

Clean SaaS style UI

Soft shadows

Card-based layout

Mobile friendly

Sidebar navigation

3. System Architecture

System Structure

Single Company System

Login
↓
Role Detection
↓
Open Role Dashboard
↓
Modules Access

4. User Roles
1. Company Admin

System ka main controller.

Access:

Dashboard
Employees
Inspections
Maintenance
Tickets
Training
Contracts
Calendar
Reports
Settings

2. Operations Manager

Operations aur inspections manage karega.

Access:

Dashboard
Inspections
Events
Employees
Reports

3. Maintenance Manager

Equipment aur repair manage karega.

Access:

Dashboard
Maintenance Dashboard
Work Orders
Maintenance Reports

4. Ticket Manager

Ticket booths aur settlement manage karega.

Access:

Dashboard
Ticket Boxes
Ticket Tracking
Settlement
Reports

5. HR / Training Manager

Employee training aur documents manage karega.

Access:

Employees
Training Library
Employee Training Progress

6. Employee / Worker

Field worker interface.

Access:

Clock In / Out
Training Videos
Task Updates
Photo Upload

5. Login System

Total Login Pages

1

Route

/login

Login Fields

Email
Password

System automatically detect karega role.

Flow

Login
↓
Authentication
↓
Role detection
↓
Redirect to dashboard

6. Main Layout Structure

Layout

Left Sidebar
Top Navbar
Main Content Area

Dashboard UI

Stats Cards

Weekly Summary
Financial Snapshot
Open Inspections
Maintenance Alerts
Ticket Sales Summary

7. Sidebar Navigation

Modules

Dashboard
Employees
Time Clock
Inspections
Maintenance
Financial
Ticket Sales
Training
Contracts
Calendar
Reports
Settings

8. Module Specifications
Employees Module

Features

Employee List
Add Employee
Employee Roles
Employee Documents
Training Progress

Time Clock

Features

Clock In / Out
Shift Logs
Work Hours
Payroll Export

Inspections

Features

Inspection Templates
Start Inspection
Inspection Reports
Photo Upload
Pass / Fail Status

Maintenance

Features

Maintenance Dashboard
Equipment Status
Repair Alerts
Maintenance Reports
Work Orders

Financial

Features

Expense Entry
Expense Categories
Expense Reports

Ticket Sales

Features

Ticket Boxes
Ticket Sellers
Ticket Tracking
Daily Sales
Weekly Settlement

Training

Features

Training Library
Video Upload
Training Modules
Employee Training Progress

Contracts

Features

Create Contract
Send to Committee
Digital Signature
Contract Archive

Calendar / Events

Features

Carnival Locations
Event Schedule
Equipment Transport
Staff Assignment

Reports

Operations Reports
Financial Reports
Employee Reports

9. Page Flow (User Flow)
Login Flow

Login
↓
Authenticate
↓
Detect Role
↓
Open Dashboard

Inspection Flow

Start Inspection
↓
Select Template
↓
Fill checklist
↓
Upload photos
↓
Submit report

Maintenance Flow

Issue Reported
↓
Create Work Order
↓
Assign Technician
↓
Repair status update
↓
Completion report

Ticket Settlement Flow

Ticket Issued
↓
Seller sells tickets
↓
Daily sales recorded
↓
Weekly settlement

10. Folder Structure (Frontend)
src

components
layout
Sidebar
Navbar
Cards

pages

dashboard

employees
EmployeeList
AddEmployee

timeclock

inspections
InspectionTemplates
StartInspection
InspectionReports

maintenance
MaintenanceDashboard
WorkOrders

tickets
TicketBoxes
TicketTracking
Settlement

training
TrainingLibrary
EmployeeTraining

contracts
CreateContract
ContractArchive

events
Calendar
EventDetails

reports

settings
11. Responsive Design Requirements

Breakpoints

Mobile
Tablet
Laptop
Desktop

Rules

Sidebar collapse on mobile
Cards stack vertically
Tables scrollable

Design must not break on any screen size.

12. Developer Collaboration Plan

Team

3 Developers

Phase 1

Developer 1

Project Setup
Layout
Sidebar
Navbar
Login
Role Based Routing
Admin Dashboard

Phase 2

Developer 1

Admin Module

Employees
Settings
Reports

Developer 2

Operations Manager

Inspections
Events
Reports

Developer 3

Maintenance Manager

Maintenance Dashboard
Work Orders
Maintenance Reports

Phase 3

Developer 1

Ticket Manager

Ticket Boxes
Ticket Tracking
Settlement

Developer 2

HR Manager

Training Library
Employee Training

Developer 3

Employee Dashboard

Clock In / Out
Training
Tasks

13. GitHub Workflow

Branching

main
develop

Developers work on

feature/admin
feature/operations
feature/maintenance

Workflow

Pull latest develop
Create feature branch
Push code
Merge into develop

14. UI Design Guidelines

Design Style

Modern SaaS
Clean cards
Rounded corners
Gradient headers
Soft shadows
Consistent spacing

Tailwind utility classes only.

15. Antigravity Development Strategy

Antigravity ko project phase wise build karwana hai.

Order

1 Project setup
2 Layout system
3 Login system
4 Admin dashboard
5 Employees module
6 Inspections module
7 Maintenance module
8 Ticket module
9 Training module
10 Contracts
11 Reports

16. Important Development Rule

Strict requirements

Only wireframe features allowed

No extra modules

Tailwind only

Fully responsive

Role based UI

No UI breaking






---------------------------------------------------------------------------------

Mainne pure project codebase ka analysis kar liya hai aur ek detailed architectural summary report taiyar ki hai. Isme routing, authentication, aur har user role ke specific workflows ko step-by-step samjhaya gaya hai.

📄 Comprehensive System Analysis Report
Aap full document yahan dekh sakte hain: 
system_architecture_analysis.md

🚀 Key System Workflows (Summary)
1. Platform Admin (Role: super_admin)
Login: platform@demo.com se access karte hain.
Workflow: Requests pipeline monitor karte hain -> Nayi companies ke signup requests approve/reject karte hain -> Subscription plans manage karte hain.
2. Company Admin (Role: admin)
Login: admin@demo.com se.
Workflow: Dashboard load hote hi financial metrics aur alerts dekhte hain -> Employees add karte hain -> Roles assign karte hain.
3. Operations Manager (Role: operations_manager)
Workflow: Daily ride safety checks (Inspections) start karte hain -> Real-time status report submit karte hain -> Events schedule manage karte hain.
4. Maintenance Manager (Role: maintenance_manager)
Workflow: Equipment repair ke liye "Work Orders" create karte hain -> Maintenance history track karte hain taaki rides hamesha stable rahein.
5. Ticket Manager (Role: ticket_manager)
Workflow: Ticket boxes/POS locations monitor karte hain -> Real-time sales track karte hain -> Din ke end mein income settle karte hain.
6. HR Manager (Role: hr)
Workflow: Safety aur procedural training assign karte hain -> Employee compliance progress track karte hain.
7. Employee (Role: employee)
Workflow: Digital Time Clock se clock-in/out karte hain -> Apni personalized task list aur assigned training dekhte hain.
🏗️ Technical Architecture Highlight
Routing: 

App.jsx
 mein central routing hai jo roles ke hisaab se pages redirect karta hai.
Auth: 

AuthContext.jsx
 localStorage ke saath session maintain karta hai.
UI: Premium Tailwind CSS design system use kiya gaya hai with high-fidelity components.
Aap report mein technical details aur code structure ki depth check kar sakte hain!