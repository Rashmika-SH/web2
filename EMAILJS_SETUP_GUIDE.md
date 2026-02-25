# EmailJS Setup Guide for Psychic Rama Website

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. After logging in, go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email (astrologerpsychicrama@gmail.com)
5. Copy the **Service ID** (you'll need this later)

## Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:**
```
New Consultation Request from {{from_name}}
```

**Body:**
```
You have received a new consultation request:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Country: {{country}}

Message:
{{message}}

---
This email was sent from your Psychic Rama website contact form.
```

4. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" → "General" in the dashboard
2. Find your **Public Key** (it looks like: "user_xxxxxxxxxxxxxxxxx")
3. Copy this key

## Step 5: Update Your Website Code
Open `script.js` and replace these three values:

1. Line 185: Replace `'YOUR_PUBLIC_KEY'` with your actual public key
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY_HERE');
   ```

2. Line 212: Replace `'YOUR_SERVICE_ID'` with your service ID
   ```javascript
   emailjs.send('YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID', templateParams)
   ```

3. Line 212: Replace `'YOUR_TEMPLATE_ID'` with your template ID
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID_HERE', templateParams)
   ```

## Example (with fake IDs):
```javascript
// Initialize EmailJS
(function() {
    emailjs.init('user_abc123xyz789');  // Your public key
})();

// In the form submission:
emailjs.send('service_gmail123', 'template_contact456', templateParams)
```

## Step 6: Test Your Form
1. Save all changes
2. Refresh your website
3. Fill out the contact form
4. Submit and check:
   - You should see "Sending..." on the button
   - You should receive an email at astrologerpsychicrama@gmail.com
   - WhatsApp should open with the message
   - Form should reset after successful submission

## Free Plan Limits
- 200 emails per month
- Perfect for starting out
- Upgrade if you need more

## Troubleshooting
- **No email received?** Check your spam folder
- **Error message?** Verify all IDs are correct in script.js
- **Button stuck on "Sending..."?** Check browser console (F12) for errors
- **Need help?** Contact EmailJS support or check their documentation

## Security Note
Your EmailJS public key is safe to use in client-side code. It's designed to be public and only allows sending emails through your configured templates.

---

That's it! Your contact form will now send emails to astrologerpsychicrama@gmail.com whenever someone submits the form. 🎉
