
🎪 Carnival SaaS Platform
Final Product Requirement Document (PRD)
1. Product Overview

ShowmensInfo / CarnivalMS ek SaaS based carnival management platform hai jo carnival companies ko apna operation digitally manage karne ki facility deta hai.

System use hota hai manage karne ke liye:

Employees
Inspections
Maintenance
Ticket Sales
Financial tracking
Training
Contracts
Events
Reports

Platform multi-company SaaS architecture par based hai.

Structure:

Landing Page
   ↓
Company Request
   ↓
Platform Admin Approval
   ↓
Company Created
   ↓
Company Login
   ↓
Role Based Dashboards
2. System Layers


System do major parts me divide hai.

Layer 1 — SaaS Platform

Platform Admin manage karta hai:

Companies
Requests
Plans
Subscriptions

Layer 2 — Company Software

Har company apna carnival operation manage karegi.

Modules:

Employees
Inspections
Maintenance
Tickets
Training
Contracts
Reports

3. User Roles
Platform Roles
Platform Admin

System owner.

Access:

Platform Dashboard
Companies
Requests
Plans
Settings

Company Roles

Company ke andar roles:

Company Admin
Operations Manager
Maintenance Manager
Ticket Manager
HR Manager
Employee

4. SaaS Landing Page

Landing page public website hai jahan se company software subscribe karegi.

Sections:

Hero Section
Features
Pricing
Signup Form
Footer

Hero section:

Project logo
Description
Get Started button

5. SaaS Pricing Plans

Sab plans me full system access milega.

Difference sirf duration ka hai.

Plan	Duration	Price
Basic	1 Month	Low
Professional	6 Months	Medium
Enterprise	12 Months	High
6. Company Request Flow

Company software use karne ke liye request bhejti hai.

Flow:

Landing Page
↓
Select Plan
↓
Fill Signup Form
↓
Submit Request
↓
Request Sent to Platform Admin

Signup form:

Company Name
Admin Name
Email
Phone
Selected Plan

7. Platform Admin Request Flow

Platform admin requests review karta hai.

Flow:

Request Received
↓
Admin Reviews Request
↓
Approve / Reject

Approve hone par:

Company create hoti hai.

8. Company Creation

Approval ke baad system:

1️⃣ Company create karega
2️⃣ Company Admin create karega
3️⃣ Login credentials generate karega
4️⃣ Plan assign karega

Example:

Company: Star Carnival
Plan: Professional
Duration: 6 Months
Expiry Date: Auto generated
9. Login System

Login route:

/login

System detect karega:

Platform Admin
Company User

Flow:

Login
↓
Check Role
↓
Redirect

Platform Admin → Platform Dashboard
Company User → Company Dashboard

10. Company Dashboard Modules

Sidebar modules:

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

11. Module Overview
Employees

Employee list
Add employee
Roles
Documents

Inspections

Inspection templates
Start inspection
Inspection reports

Maintenance

Equipment status
Repair alerts
Work orders

Ticket Sales

Ticket boxes
Seller tracking
Daily sales
Settlement

Training

Training library
Employee training progress

Contracts

Create contract
Digital signature
Archive

Calendar

Event schedule
Carnival locations

Reports

Operations reports
Financial reports
Employee reports

12. Subscription Logic

Subscription plan duration:

1 Month
6 Months
12 Months

Example:

Start Date: 1 Jan
Plan: Professional
Expiry Date: 1 July

Expiry ke baad system:

Login disable
Renewal required

13. Platform Admin Features

Platform admin control karta hai:

Companies
Plans
Requests
Subscriptions

Platform Dashboard:

Total Companies
Active Subscriptions
Pending Requests

14. SaaS Routing Structure

Public routes:

/  
/pricing  
/signup  
/login

Platform admin routes:

/platform-admin  
/platform-admin/companies  
/platform-admin/requests  
/platform-admin/plans

Company routes:

/admin-dashboard  
/operations-dashboard  
/maintenance-dashboard  
/ticket-dashboard  
/hr-dashboard  
/employee-dashboard
15. Technology Stack

Frontend:

React
Tailwind CSS
React Router

Backend (future):

Node.js
Express
Prisma
PostgreSQL

16. UI Design Guidelines

Design:

Carnival themed UI
Card layout
Soft shadows
Responsive design

Brand colors:

Red
Gold
Orange
Maroon

Logo present on:

Navbar
Sidebar
Landing page

🚀 System Flow Explanation (Simple)
Step 1

User website open karta hai.

Landing page dekhta hai.

Step 2

User pricing plan select karta hai.

Example:

Professional Plan

Step 3

Company details fill karta hai.

Submit request.

Step 4

Request platform admin ke dashboard me dikhegi.

Menu:

Requests

Step 5

Platform admin request approve karta hai.

Step 6

System company create karta hai.

Admin ko login credentials milte hain.

Step 7

Company admin login karta hai.

Dashboard open hota hai.

Step 8

Admin employees add karta hai.

Step 9

Operations manager inspections manage karta hai.

Step 10

Maintenance manager equipment repairs track karta hai.