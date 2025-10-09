# Netlify Forms Setup Instructions

## Overview
Your website has **2 contact forms** that are already configured to use Netlify Forms. This guide will help you complete the setup to receive form submissions at your email address.

## Forms on Your Website

1. **Project Enquiry Form** ([contact.html](contact.html))
   - Form name: `project-enquiry-full`
   - For customers submitting project requests
   - Redirects to: `/thank-you.html`

2. **Trade Application Form** ([join-network.html](join-network.html))
   - Form name: `trade-application`
   - For trade professionals applying to join your network
   - Redirects to: `/thank-you.html`

## Step-by-Step Setup

### 1. Deploy Your Website to Netlify (5 minutes)

If you haven't already deployed:

1. **Log in to Netlify** at https://app.netlify.com
2. **Click "Add new site" → "Import an existing project"**
3. **Connect your Git repository** (GitHub, GitLab, or Bitbucket)
   - Or drag and drop your project folder for manual deployment
4. **Configure build settings:**
   - Build command: (leave empty)
   - Publish directory: `.` (current directory)
5. **Click "Deploy site"**

### 2. Enable Form Notifications (5 minutes)

After deployment, Netlify will automatically detect your forms. To receive email notifications:

1. **Go to your site dashboard** on Netlify
2. **Click "Forms" in the left sidebar**
3. **Verify both forms appear:**
   - `project-enquiry-full`
   - `trade-application`
4. **Click "Settings" for each form**
5. **Enable "Form notifications"**
6. **Add your email address** where you want to receive submissions
7. **Save changes**

### 3. Configure Email Notifications (Optional but Recommended)

For better email formatting:

1. **In Forms settings, click "Notifications"**
2. **Choose "Email notification"**
3. **Customize the email template:**
   - Subject: `New {{form-name}} submission`
   - Email to: `your-email@example.com`
4. **Save**

### 4. Test Your Forms (5 minutes)

1. **Visit your live website**
2. **Fill out the contact form** at `/contact.html`
3. **Submit the form**
4. **Verify:**
   - You're redirected to `/thank-you.html`
   - You receive an email notification
   - The submission appears in Netlify Forms dashboard
5. **Repeat for the trade application form** at `/join-network.html`

## Email Setup Options

### Option 1: Netlify Email Notifications (Free)
- Included with all Netlify plans
- Basic email notifications
- Limited customization
- **Best for: Getting started quickly**

### Option 2: Form Webhooks + Email Service
- Use Netlify webhooks to trigger email services
- Examples: SendGrid, Mailgun, AWS SES
- More control over email formatting
- **Best for: Professional email templates**

### Option 3: Zapier Integration
- Connect Netlify Forms to Zapier
- Send to Gmail, Outlook, or any email service
- Add to CRM, Google Sheets, etc.
- **Best for: Automation and multiple integrations**

## Form Submission Data

Each form captures the following data:

### Project Enquiry Form
- Full Name
- Email Address
- Phone Number
- Project Location
- Project Type
- Project Description
- Timeline
- Budget
- Property Type
- Access/Site Considerations
- Additional Information
- How they heard about you

### Trade Application Form
- Personal Details (Name, Email, Phone)
- Business Information
- Trade/Skills
- Service Area
- Licensing & Insurance
- Experience Summary
- Portfolio/Website Links
- References
- Availability
- Additional Information

## Spam Protection

Your forms include:
- **Honeypot field** (`bot-field`) - catches simple spam bots
- **Netlify's spam filtering** - automatic spam detection

For additional protection, you can:
1. Enable **reCAPTCHA** in Netlify Forms settings
2. Add custom spam filtering rules

## Viewing Submissions

**In Netlify Dashboard:**
1. Go to **Forms** section
2. Click on form name to view submissions
3. Export as CSV if needed

**Via Email:**
- Submissions arrive at configured email address
- Check spam folder initially
- Add Netlify to contacts to avoid spam filtering

## Troubleshooting

### Forms not appearing in Netlify dashboard
- **Solution:** Ensure you've deployed the site after adding forms
- Netlify detects forms during build/deploy process

### Not receiving email notifications
- **Solution:** Check spam folder
- Verify email address in Form Notifications settings
- Check Netlify Forms dashboard to confirm submissions are being received

### Form submission returns 404 error
- **Solution:** Ensure `action="/thank-you.html"` path is correct
- Verify `thank-you.html` file exists in your deployment

### Submissions not saving
- **Solution:** Verify form has these attributes:
  - `data-netlify="true"`
  - `name="[form-name]"`
  - Hidden field: `<input type="hidden" name="form-name" value="[form-name]">`

## Important Files

- **Contact Form:** [contact.html](contact.html) (line 54)
- **Trade Application:** [join-network.html](join-network.html) (line 202)
- **Success Page:** [thank-you.html](thank-you.html)
- **Netlify Config:** [netlify.toml](netlify.toml)

## Next Steps After Setup

1. ✅ Deploy to Netlify
2. ✅ Configure email notifications
3. ✅ Test both forms
4. ✅ Set up spam protection (optional)
5. ✅ Monitor submissions daily
6. ✅ Respond to enquiries within 24 hours (as promised on website)

## Support

- **Netlify Forms Documentation:** https://docs.netlify.com/forms/setup/
- **Netlify Support:** https://answers.netlify.com/

## Form Submission Workflow

```
User fills form → Netlify receives submission → Email sent to you → View in dashboard → Respond to customer
```

Your forms are now ready to go! Just deploy to Netlify and configure your email notifications.
