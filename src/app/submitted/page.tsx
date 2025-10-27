'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { BRAND_CONFIG } from '@/config/brand.config';

export default function SubmittedPage() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showDoNotSell, setShowDoNotSell] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafb 100%)',
        py: { xs: 3, md: 6 },
      }}
    >
      <Container maxWidth="md">
        {/* Success Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <EmojiEventsIcon
              sx={{
                fontSize: '64px',
                color: BRAND_CONFIG.colors.primary,
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: BRAND_CONFIG.colors.textPrimary,
              mb: 2,
              fontSize: { xs: '28px', md: '36px' },
            }}
          >
            You're One Step Closer to Homeownership! 🎉
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: BRAND_CONFIG.colors.textSecondary,
              fontSize: '16px',
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            Thank you for submitting your information. Your Mortgage Assistant is reviewing your details now.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: BRAND_CONFIG.colors.textSecondary,
              fontSize: '16px',
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            You'll receive a text message shortly with next steps.
          </Typography>
        </Box>

        {/* Video */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              mb: 2,
            }}
          >
            <video
              width="100%"
              height="auto"
              autoPlay
              muted
              controls
              style={{
                display: 'block',
                maxWidth: '100%',
                borderRadius: '12px',
              }}
            >
              <source
                src="https://firebasestorage.googleapis.com/v0/b/vhg-buy-refi-form.firebasestorage.app/o/AZ%20Loan%20Pros%20Thank%20You%20Message%20with%20Captions%20DS.mp4?alt=media&token=ae79816d-6f52-4ac0-a9f4-108889b36838"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: BRAND_CONFIG.colors.textSecondary,
              fontSize: '14px',
              fontWeight: 500,
              mb: 3,
            }}
          >
            🔇 Tap to Unmute
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack
          spacing={2}
          sx={{
            mb: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'column' },
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => handleExternalLink('https://canopymortgage.com/lo/joshjiron/')}
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 600,
              py: 2.5,
              px: 4,
              borderRadius: '8px',
              maxWidth: '380px',
              width: '100%',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Start Pre-Qualification
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={() => handleExternalLink('https://links.mortgageconnectpro.com/widget/booking/ZDIKbtb1KM6wSrUf4Oy9')}
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 600,
              py: 2.5,
              px: 4,
              borderRadius: '8px',
              maxWidth: '380px',
              width: '100%',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Book a Call
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={() => handleExternalLink('https://myarizonahomebuying.com/listing')}
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 600,
              py: 2.5,
              px: 4,
              borderRadius: '8px',
              maxWidth: '380px',
              width: '100%',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Start Your Home Search
          </Button>
        </Stack>

        {/* Privacy Notice */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: '#f0f9ff',
            border: `2px solid ${BRAND_CONFIG.colors.primary}`,
            borderRadius: '12px',
            p: 3,
            mb: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: BRAND_CONFIG.colors.primary,
              mb: 2,
            }}
          >
            {BRAND_CONFIG.legal.privacyNotice}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: BRAND_CONFIG.colors.textSecondary,
              lineHeight: 1.7,
              fontSize: '14px',
            }}
          >
            {BRAND_CONFIG.legal.disclaimer}
          </Typography>
        </Paper>

        {/* Footer Links */}
        <Box
          sx={{
            borderTop: `1px solid ${BRAND_CONFIG.colors.border}`,
            pt: 4,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 2, md: 3 },
              mb: 3,
            }}
          >
            {[
              { label: 'Privacy Policy', onClick: () => setShowPrivacyPolicy(true), isButton: true },
              { label: 'Do Not Sell My Personal Information', onClick: () => setShowDoNotSell(true), isButton: true },
              { label: 'Accessibility Statement', onClick: () => setShowAccessibility(true), isButton: true },
              { label: BRAND_CONFIG.legal.nmls.text, href: BRAND_CONFIG.legal.nmls.link, isButton: false },
            ].map((link, index) => (
              <Typography
                key={index}
                component={link.isButton ? 'button' : 'a'}
                onClick={link.isButton ? link.onClick : undefined}
                href={!link.isButton ? link.href : undefined}
                target={!link.isButton ? '_blank' : undefined}
                rel={!link.isButton ? 'noopener noreferrer' : undefined}
                sx={{
                  fontSize: '14px',
                  color: BRAND_CONFIG.colors.primary,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  fontFamily: 'inherit',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: BRAND_CONFIG.colors.primaryDark,
                  },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>

          {/* Equal Housing Opportunity */}
          <Typography
            variant="caption"
            sx={{
              color: BRAND_CONFIG.colors.textSecondary,
              fontSize: '12px',
              display: 'block',
              mt: 2,
            }}
          >
            Equal Housing Opportunity
          </Typography>
        </Box>
      </Container>

      {/* Privacy Policy Modal */}
      <Dialog
        open={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            maxHeight: '70vh',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: '24px',
            fontWeight: 700,
            color: BRAND_CONFIG.colors.textPrimary,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${BRAND_CONFIG.colors.border}`,
          }}
        >
          Privacy Policy for Arizona Home Loan Pros
          <IconButton
            onClick={() => setShowPrivacyPolicy(false)}
            size="small"
            sx={{ color: BRAND_CONFIG.colors.textSecondary }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            maxHeight: '70vh',
            overflow: 'auto',
            pt: 3,
            whiteSpace: 'pre-wrap',
            color: '#333333',
            lineHeight: 1.6,
            fontSize: '15px',
          }}
        >
          {`PRIVACY POLICY FOR ARIZONA HOME LOAN PROS

Last Updated: January 2024

1. INFORMATION WE COLLECT

We collect information you provide directly to us through our website forms and interactions. This includes:

• Personal Identifiers: First name, last name, email address, phone number, and zip code
• Financial Information: Estimated home purchase price, down payment amount, credit score range
• Loan Information: Desired loan type, employment status, monthly income range, liquid assets
• Property Information: Property type, property use, estimated purchase timeline
• Additional Details: Co-applicant information, bankruptcy history, military service status

We also collect information automatically when you interact with our website:
• Device information: Browser type, operating system, device type
• Usage data: Pages visited, time spent, interactions with forms
• Analytics data: Through Google Analytics and similar tools

2. HOW WE USE YOUR INFORMATION

We use the information we collect to:

• Process and fulfill your mortgage pre-qualification request
• Connect you with a licensed Mortgage Advisor in your area
• Provide personalized mortgage guidance and recommendations
• Send you updates about your application status
• Communicate about our services and products
• Improve our website and services
• Comply with legal and regulatory requirements
• Prevent fraud and protect against unauthorized access

3. HOW WE SHARE YOUR INFORMATION

We do NOT sell your personal information to multiple parties. Instead, we connect you directly with one licensed Mortgage Advisor. Your information may be shared with:

• Service Providers: Third-party service providers who assist us in operating our website and conducting our business (such as hosting providers, analytics services)
• Legal Requirements: When required by law or to protect our legal rights
• Business Transfers: In the event of a merger, acquisition, or sale of assets
• Your Chosen Advisor: A single licensed Mortgage Advisor to help you with your mortgage needs

4. DATA SECURITY

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:

• Encryption of sensitive data in transit and at rest
• Access controls and authentication mechanisms
• Regular security audits and assessments
• Secure data storage facilities

5. COOKIES & TRACKING TECHNOLOGIES

Our website uses cookies and similar tracking technologies to:

• Remember your preferences
• Understand how you use our website
• Provide analytics about website performance
• Enable core functionality

You can control cookie settings through your browser preferences.

6. YOUR RIGHTS & CHOICES

You have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your information (subject to legal obligations)
• Opt-out of marketing communications
• Object to certain types of processing

To exercise these rights, contact us at support@arizonahomeloanpros.com.

7. CHILDREN'S PRIVACY

Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete such information.

8. CHANGES TO THIS POLICY

We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website with an updated "Last Updated" date.

9. CONTACT INFORMATION

If you have questions about this Privacy Policy or our privacy practices, please contact us at:

Email: support@arizonahomeloanpros.com
Response Time: We aim to respond within 30 days

10. IMPORTANT NOTICE

Arizona Home Loan Pros is committed to protecting your personal information. Unlike many online mortgage platforms that sell your information to multiple lenders, banks, and third parties, we don't. Instead, you are connected with a single licensed Mortgage Advisor who can provide personalized service and ensure your information remains private. This approach protects your privacy while giving you direct access to professional mortgage guidance.`}
        </DialogContent>
        <DialogActions sx={{ borderTop: `1px solid ${BRAND_CONFIG.colors.border}`, p: 2 }}>
          <Button
            onClick={() => setShowPrivacyPolicy(false)}
            sx={{
              backgroundColor: BRAND_CONFIG.colors.primary,
              color: 'white',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 600,
              px: 3,
              '&:hover': {
                backgroundColor: BRAND_CONFIG.colors.primaryDark,
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Do Not Sell Modal */}
      <Dialog
        open={showDoNotSell}
        onClose={() => setShowDoNotSell(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            maxHeight: '70vh',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: '24px',
            fontWeight: 700,
            color: BRAND_CONFIG.colors.textPrimary,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${BRAND_CONFIG.colors.border}`,
          }}
        >
          Do Not Sell My Personal Information
          <IconButton
            onClick={() => setShowDoNotSell(false)}
            size="small"
            sx={{ color: BRAND_CONFIG.colors.textSecondary }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            maxHeight: '70vh',
            overflow: 'auto',
            pt: 3,
            whiteSpace: 'pre-wrap',
            color: '#333333',
            lineHeight: 1.6,
            fontSize: '15px',
          }}
        >
          {`DO NOT SELL MY PERSONAL INFORMATION

Last Updated: January 2024

OUR COMMITMENT: WE DO NOT SELL YOUR PERSONAL INFORMATION

Arizona Home Loan Pros is committed to protecting your privacy. We want to be clear: We DO NOT sell your personal information to any party for any consideration. This commitment applies to all personal information we collect about you, whether online or offline.

Your information is valuable to us—not because we can sell it, but because it allows us to connect you with a trusted, licensed Mortgage Advisor who can provide personalized service.

HOW WE USE YOUR INFORMATION

When you submit information through our website, we use it to:

• Evaluate your mortgage needs and financial situation
• Pair you with a qualified, licensed Mortgage Advisor in your area
• Communicate with you about your application and our services
• Improve our website and services

We never rent, trade, or sell your personal information to third parties.

LIMITED SHARING FOR SERVICE PURPOSES

While we do not sell your information, we may share it with:

• Service Providers: Third parties who help us operate our website and provide services (hosting, analytics, payment processing)
• Your Assigned Mortgage Advisor: A single licensed professional to assist with your mortgage needs
• Legal Requirements: When legally required to do so

All third parties we share information with are required to maintain the confidentiality and security of your information.

YOUR CHOICES & CONTROL

You have several options regarding your personal information:

• Opt-Out of Marketing: You can opt-out of promotional emails and SMS messages
• Access Your Information: Request a copy of the personal information we have about you
• Update Your Information: Correct or update information you've provided
• Delete Your Information: Request deletion of your information (subject to legal retention requirements)
• Manage Cookies: Control tracking through your browser settings

To exercise any of these rights, contact us at support@arizonahomeloanpros.com.

WHY CHOOSE ARIZONA HOME LOAN PROS?

Unlike many online mortgage platforms, we operate differently:

✓ Single Licensed Advisor Connection: You work with one trusted Mortgage Advisor, not multiple lenders
✓ Direct Personal Service: No middlemen or mass data sharing
✓ Your Privacy Protected: Your information stays with us and your advisor
✓ Personalized Guidance: Get recommendations tailored to your specific situation
✓ Transparent Practices: We're clear about how we use your information

CONTACT INFORMATION

If you have questions about our data practices or want to exercise your privacy rights:

Email: support@arizonahomeloanpros.com
Response Time: We aim to respond within 30 days

UPDATES TO THIS NOTICE

We review this notice regularly and update it as needed. Any material changes will be posted on our website with an updated date. We encourage you to review this notice periodically.

Your privacy is important to us. Arizona Home Loan Pros remains committed to transparent, ethical data practices that put your interests first.`}
        </DialogContent>
        <DialogActions sx={{ borderTop: `1px solid ${BRAND_CONFIG.colors.border}`, p: 2 }}>
          <Button
            onClick={() => setShowDoNotSell(false)}
            sx={{
              backgroundColor: BRAND_CONFIG.colors.primary,
              color: 'white',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 600,
              px: 3,
              '&:hover': {
                backgroundColor: BRAND_CONFIG.colors.primaryDark,
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Accessibility Statement Modal */}
      <Dialog
        open={showAccessibility}
        onClose={() => setShowAccessibility(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            maxHeight: '70vh',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: '24px',
            fontWeight: 700,
            color: BRAND_CONFIG.colors.textPrimary,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${BRAND_CONFIG.colors.border}`,
          }}
        >
          Accessibility Statement
          <IconButton
            onClick={() => setShowAccessibility(false)}
            size="small"
            sx={{ color: BRAND_CONFIG.colors.textSecondary }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            maxHeight: '70vh',
            overflow: 'auto',
            pt: 3,
            whiteSpace: 'pre-wrap',
            color: '#333333',
            lineHeight: 1.6,
            fontSize: '15px',
          }}
        >
          {`ACCESSIBILITY STATEMENT FOR ARIZONA HOME LOAN PROS

Last Updated: January 2024

OUR COMMITMENT TO ACCESSIBILITY

Arizona Home Loan Pros is committed to ensuring that our website is accessible to all visitors, regardless of ability or disability. We strive to provide an inclusive digital experience that complies with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.

ACCESSIBILITY FEATURES

Our website includes:

• Clear Navigation: Logical structure and easy-to-find information
• Readable Fonts: Legible font sizes and high contrast between text and background
• Color Contrast: Sufficient color contrast to meet WCAG standards
• Keyboard Navigation: Full functionality available via keyboard
• Screen Reader Compatible: Semantic HTML and ARIA labels for assistive technologies
• Mobile Responsive: Optimized for all devices and screen sizes
• Form Labels: Clear labels and instructions for all form fields
• Alternative Text: Descriptive alt text for images

ONGOING IMPROVEMENTS

We continuously work to improve accessibility:

• Regular Testing: We test our website across different devices, browsers, and assistive technologies
• User Feedback: We welcome suggestions for accessibility improvements
• Staff Training: Our team receives training on accessibility best practices
• Standards Compliance: We stay updated with evolving accessibility standards

THIRD-PARTY WEBSITES

Our website may contain links to third-party websites. We are not responsible for the accessibility of external sites, though we try to link only to accessible resources.

REQUESTING ASSISTANCE

If you experience accessibility issues or need assistance using our website, please contact us:

Email: support@arizonahomeloanpros.com
Phone: (520) 645-5533
Response Time: We aim to respond within 24-48 hours

PRIVACY COMMITMENT

All accessibility requests and communications are treated with confidentiality and will not be used for marketing purposes.

UPDATES TO THIS STATEMENT

This accessibility statement is reviewed regularly and updated as needed to reflect improvements and changes to our website.

Arizona Home Loan Pros remains committed to providing an accessible and inclusive experience for all our visitors.`}
        </DialogContent>
        <DialogActions sx={{ borderTop: `1px solid ${BRAND_CONFIG.colors.border}`, p: 2 }}>
          <Button
            onClick={() => setShowAccessibility(false)}
            sx={{
              backgroundColor: BRAND_CONFIG.colors.primary,
              color: 'white',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 600,
              px: 3,
              '&:hover': {
                backgroundColor: BRAND_CONFIG.colors.primaryDark,
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
