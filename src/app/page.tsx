'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import Image from 'next/image';
import { BRAND_CONFIG } from '@/config/brand.config';
import { FormSelector } from '@/components/forms/FormSelector';
import { RefinanceForm } from '@/components/forms/RefinanceForm';
import { ConversationalForm } from '@/components/forms/ConversationalForm';

type FormState = {
  type: 'buy' | 'refinance' | null;
  style: 'traditional' | 'conversational' | null;
};

export default function HomePage() {
  const [selectedForm, setSelectedForm] = useState<FormState>({
    type: null,
    style: null,
  });
  const [showStyleOptions, setShowStyleOptions] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showDoNotSell, setShowDoNotSell] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  // Handle form type selection
  const handleFormTypeSelect = (type: 'buy' | 'refinance') => {
    setSelectedForm({ type, style: null });
    setShowStyleOptions(true);
  };

  // Handle form style selection
  const handleFormStyleSelect = (style: 'traditional' | 'conversational') => {
    setSelectedForm((prev) => ({ ...prev, style }));
    setShowStyleOptions(false);
  };

  // Show form style options modal
  if (showStyleOptions && selectedForm.type) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafb 100%)',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: '12px',
              textAlign: 'center',
              backgroundColor: 'white',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#000000',
                mb: 2,
                fontFamily: BRAND_CONFIG.typography.fontFamily.heading,
              }}
            >
              Choose Your Form Style
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#666666',
                mb: 4,
                fontSize: '1.125rem',
                fontFamily: BRAND_CONFIG.typography.fontFamily.primary,
              }}
            >
              How would you like to fill out your form?
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Button
                onClick={() => handleFormStyleSelect('traditional')}
                sx={{
                  padding: '18px 32px',
                  backgroundColor: BRAND_CONFIG.colors.secondary,
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#0088CC',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                📋 Traditional Form
              </Button>

              <Button
                onClick={() => handleFormStyleSelect('conversational')}
                sx={{
                  padding: '18px 32px',
                  backgroundColor: BRAND_CONFIG.colors.secondary,
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#0088CC',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                💬 Conversational Chat
              </Button>
            </Box>

            <Button
              onClick={() => {
                setShowStyleOptions(false);
                setSelectedForm({ type: null, style: null });
              }}
              sx={{
                mt: 3,
                color: BRAND_CONFIG.colors.secondary,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              ← Go Back
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Render traditional forms
  if (selectedForm.style === 'traditional') {
    if (selectedForm.type === 'buy') {
      return <FormSelector formType="buy" onBack={() => setSelectedForm({ type: null, style: null })} />;
    }
    if (selectedForm.type === 'refinance') {
      return <RefinanceForm onBack={() => setSelectedForm({ type: null, style: null })} />;
    }
  }

  // Render conversational forms
  if (selectedForm.style === 'conversational') {
    if (selectedForm.type) {
      return <ConversationalForm formType={selectedForm.type} onBack={() => setSelectedForm({ type: null, style: null })} />;
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafb 100%)',
      }}
    >
      {/* Logo Header */}
      <Box
        sx={{
          py: 4,
          pl: 0,
          pr: 2,
          background: 'transparent',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '280px', md: '350px' },
            height: { xs: '120px', md: '160px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/Updated Logo.png"
            alt="Arizona Home Loan Pros Logo"
            fill
            style={{
              objectFit: 'cover',
            }}
            priority
          />
        </Box>
      </Box>

      {/* Main Content Area - Hero Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          py: { xs: 2, md: 2 },
          px: 2,
          position: 'relative',
          mt: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' },
              gap: { xs: 4, md: 4 },
              alignItems: 'center',
            }}
          >
            {/* Left Side - Content */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Main Heading */}
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.125rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 4,
                  lineHeight: 1.2,
                  fontFamily: BRAND_CONFIG.typography.fontFamily.heading,
                  letterSpacing: '-0.5px',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                CHECK YOUR ELIGIBILITY NOW
              </Typography>

              {/* Subheadings */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.375rem' },
                  color: '#333333',
                  mb: 2,
                  lineHeight: 1.6,
                  fontFamily: BRAND_CONFIG.typography.fontFamily.primary,
                  fontWeight: 500,
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                Every home journey begins with knowing what's possible.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.375rem' },
                  color: '#333333',
                  mb: 4,
                  lineHeight: 1.6,
                  fontFamily: BRAND_CONFIG.typography.fontFamily.primary,
                  fontWeight: 500,
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                Discover your price range today in less than a minute.
              </Typography>

              {/* Instructions */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                  color: '#333333',
                  mb: 4,
                  lineHeight: 1.6,
                  fontFamily: BRAND_CONFIG.typography.fontFamily.primary,
                  fontWeight: 600,
                }}
              >
                Select an option below to begin your path to homeownership.
              </Typography>

              {/* Form Selection Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  mb: 4,
                }}
              >
                {BRAND_CONFIG.forms.options.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleFormTypeSelect(option.id as 'buy' | 'refinance')}
                    sx={{
                      padding: '18px 32px',
                      backgroundColor: BRAND_CONFIG.colors.secondary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: { xs: '1.125rem', md: '1.25rem' },
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontFamily: BRAND_CONFIG.typography.fontFamily.heading,
                      boxShadow: '0 2px 8px rgba(0, 170, 255, 0.2)',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#0088CC',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 24px rgba(0, 136, 204, 0.4)',
                      },
                      '&:active': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0, 136, 204, 0.3)',
                      },
                    }}
                  >
                    {option.id === 'buy' ? 'I want to buy a home' : 'I want to refinance my home'} →
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Right Side - Image */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: '400px', md: '500px' },
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '150%',
                  height: '150%',
                }}
              >
                <Image
                  src="/homebuying.jpg"
                  alt="Home buying illustration"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                  priority
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Full Width Privacy Notice */}
      <Box
        sx={{
          py: { xs: 4, md: 5 },
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            sx={{
              color: '#555555',
              fontSize: { xs: '0.9375rem', md: '1rem' },
              lineHeight: 1.6,
              fontWeight: 600,
              mb: 7,
              textAlign: 'center',
            }}
          >
            No login or SSN required. This will NOT impact your credit, and it takes less than 1 minute to complete!
          </Typography>
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              bgcolor: '#ffffff',
              borderRadius: '8px',
              border: `2px solid ${BRAND_CONFIG.colors.secondary}`,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0, 170, 255, 0.12)',
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#666666',
                fontSize: { xs: '0.875rem', md: '0.9375rem' },
                lineHeight: 1.6,
                textAlign: 'center',
                mb: 2,
              }}
            >
              {BRAND_CONFIG.legal.privacyNotice}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#999999',
                fontSize: { xs: '0.8125rem', md: '0.875rem' },
                lineHeight: 1.5,
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              {BRAND_CONFIG.legal.disclaimer}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Safety Notice Section */}
      <Box
        sx={{
          py: { xs: 4, md: 5 },
          px: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 3,
            bgcolor: 'rgba(0, 170, 255, 0.08)',
            borderRadius: '8px',
            border: '1px solid rgba(0, 170, 255, 0.15)',
            width: 'fit-content',
          }}
        >
          <LockIcon
            sx={{
              color: BRAND_CONFIG.colors.secondary,
              fontSize: 24,
              flexShrink: 0,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: '#333333',
              fontSize: { xs: '1rem', md: '1.0625rem' },
              lineHeight: 1.5,
            }}
          >
            We keep your information private, safe and secure
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 3,
          px: 2,
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          bgcolor: '#ffffff',
          mt: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 1.5, sm: 2.5 },
            }}
          >
            <Box sx={{ width: 40, height: 40, position: 'relative', flexShrink: 0 }}>
              <Typography sx={{ fontSize: '1.75rem' }}>⚖️</Typography>
            </Box>
            {[
              { label: 'Privacy Policy', href: '#', onClick: () => setShowPrivacyPolicy(true), isButton: true },
              { label: 'Do Not Sell My Personal Information', href: '#', onClick: () => setShowDoNotSell(true), isButton: true },
              { label: 'Accessibility Statement', href: '#', onClick: () => setShowAccessibility(true), isButton: true },
              { label: BRAND_CONFIG.legal.nmls.text, href: BRAND_CONFIG.legal.nmls.link, isButton: false },
            ].map((link, index) => (
              <Typography
                key={index}
                component={link.isButton ? 'button' : 'a'}
                onClick={link.isButton ? link.onClick : undefined}
                href={!link.isButton ? link.href : undefined}
                target={!link.isButton && link.href.startsWith('http') ? '_blank' : undefined}
                rel={!link.isButton && link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                variant="caption"
                sx={{
                  color: BRAND_CONFIG.colors.secondary,
                  textDecoration: 'none',
                  fontSize: { xs: '0.875rem', md: '0.9375rem' },
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Privacy Policy Modal */}
      <Dialog
        open={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#000000',
            pb: 2,
          }}
        >
          Privacy Policy for Arizona Home Loan Pros
          <IconButton
            onClick={() => setShowPrivacyPolicy(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            maxHeight: '70vh',
            overflow: 'auto',
            pt: 2,
            '& h3': {
              fontWeight: 700,
              mt: 2,
              mb: 1,
              fontSize: '1rem',
              color: '#000000',
            },
            '& p': {
              mb: 1.5,
              lineHeight: 1.6,
              color: '#333333',
              fontSize: '0.95rem',
            },
          }}
        >
          <Typography component="div" sx={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: 1.6, color: '#333333' }}>
{`At Arizona Home Loan Pros ("we," "us," or "our"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, www.arizonahomeloanpros.com, or engage with our services, including our lead capture forms, mortgage inquiry processes, and communications with our Mortgage Advisors. By using our website or services, you consent to the practices described in this Privacy Policy.

This policy complies with applicable U.S. federal and Arizona state laws, including the Gramm-Leach-Bliley Act (GLBA) for financial institutions and other relevant data protection regulations.

1. INFORMATION WE COLLECT

We collect information to provide you with personalized mortgage solutions and to facilitate the home loan application process. The information we collect falls into the following categories:

a. Information You Provide Directly

We collect nonpublic personal information that you voluntarily provide when interacting with our website, forms, or services, including:

• Personal Identifiers: Name, mailing address, email address, phone number, and Social Security Number.
• Financial Information: Income, employment details, credit history, bank account details, and other financial data provided through applications or forms.
• Other Information: Details about your home loan preferences, property details, or other information you share during phone calls, emails, SMS, online chats, or in-person meetings.

b. Information from Your Transactions

We collect information related to your interactions with us or our partners, including:

• Transaction History: Payment histories, account balances, and loan application statuses.
• Service Interactions: Records of your inquiries, communications with our Mortgage Advisors, or engagement with our AI-powered tools (e.g., chatbots like Ava or Closebot).

c. Information from Third Parties

We may obtain information from third parties to verify or supplement the data you provide, including:

• Consumer Reporting Agencies: Credit scores, credit reports, and other indicators of creditworthiness.
• Employers or Financial Institutions: Verification of employment status, income, or deposits.
• Public Records: Information related to property ownership or liens.

d. Automatically Collected Information

When you visit our website, we may automatically collect non-personally identifiable information through cookies, web beacons, and similar technologies, including:

• Device Information: IP address, browser type, operating system, and device identifiers.
• Browsing Behavior: Pages visited, time spent on our website, referral URLs, and clickstream data.
• Geolocation Data: General location information (e.g., city or region) based on your IP address, unless you explicitly opt out.

2. HOW WE USE YOUR INFORMATION

We use the information we collect to provide, improve, and personalize our services. Specific purposes include:

• Loan Eligibility and Processing: Assessing your eligibility for mortgage products and facilitating the loan application process.
• Personalized Services: Offering tailored mortgage options based on your financial profile and preferences.
• Communication: Responding to your inquiries, providing updates on your application, and delivering educational content.
• Website Improvement: Analyzing user behavior to enhance our website's functionality and user experience.
• Legal Compliance: Fulfilling regulatory requirements, such as verifying your identity or reporting to government agencies.
• Marketing and Outreach: Sending you promotional materials, updates, or offers related to our services, subject to your consent and applicable laws.

3. HOW WE SHARE YOUR INFORMATION

We do not sell, trade, or transfer your personally identifiable information to multiple third parties for marketing purposes. Unlike many online mortgage platforms, we connect you directly with a licensed Mortgage Advisor in your market, ensuring a streamlined and personalized experience. However, we may share your information in the following limited circumstances:

a. Service Providers and Partners

We may share your information with trusted third parties who assist us in providing our services, including:

• Financial Institutions: Banks, lenders, or credit agencies involved in evaluating or processing your loan application.
• Service Providers: Companies that support our operations, such as data hosting, payment processing, or customer relationship management (CRM) systems.
• Verification Services: Entities that verify your employment, income, or credit information.

b. Legal and Regulatory Requirements

We may disclose your information when required by law or to protect our rights, including:

• Responding to subpoenas, court orders, or other legal processes.
• Complying with federal or state regulations.
• Investigating fraud, security breaches, or other violations of our policies.

c. Business Transfers

In the event of a merger, acquisition, or sale of all or part of our business, your information may be transferred to the acquiring entity, subject to equivalent privacy protections.

4. DATA SECURITY

We implement robust physical, electronic, and procedural safeguards to protect your personal information from unauthorized access, use, or disclosure. These measures include:

• Encryption: Using secure socket layer (SSL) technology to encrypt sensitive data transmitted through our website.
• Access Controls: Restricting access to your information to authorized personnel only.
• Secure Storage: Storing your data on servers with advanced security protocols.
• Regular Audits: Conducting periodic reviews of our security practices to ensure compliance with industry standards.

Despite these measures, no online system is completely secure. In the unlikely event of a data breach, we will notify affected individuals in accordance with Arizona law and other applicable regulations.

5. COOKIES AND TRACKING TECHNOLOGIES

Our website uses cookies, web beacons, and similar technologies to enhance your experience and collect analytics. These tools help us:

• Remember your preferences and form inputs.
• Track website usage and performance.
• Deliver personalized content and advertisements.

You can manage cookie preferences through your browser settings. However, disabling cookies may limit certain features of our website.

6. YOUR RIGHTS AND CHOICES

As a user of our services, you have certain rights regarding your personal information, subject to applicable laws:

a. Access and Correction

You may request access to or correction of your personal information by contacting us at support@arizonahomeloanpros.com. We will respond within a reasonable timeframe, typically within 30 days, as required by law.

b. Opt-Out of Marketing Communications

You may opt out of receiving promotional emails, SMS, or other marketing communications by:

• Clicking the "unsubscribe" link in our emails.
• Replying "STOP" to SMS messages.
• Contacting us directly at support@arizonahomeloanpros.com.

Note that opting out of marketing communications will not affect transactional or service-related communications (e.g., loan application updates).

c. Do Not Track Signals

Our website does not currently respond to "Do Not Track" signals from browsers, as there is no universal standard for interpreting these signals. However, you can manage tracking preferences via your browser's cookie settings.

d. Arizona-Specific Rights

Under Arizona law, you may have additional rights, such as notification in the event of a data breach. We are committed to complying with these requirements.

7. THIRD-PARTY LINKS

Our website may contain links to third-party websites, such as those of lenders or credit agencies. We are not responsible for the privacy practices or content of these sites. We encourage you to review the privacy policies of any third-party websites you visit.

8. CHILDREN'S PRIVACY

Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected such information, we will take steps to delete it in accordance with applicable laws.

9. CHANGES TO THIS PRIVACY POLICY

We may update this Privacy Policy to reflect changes in our practices, legal requirements, or industry standards. Any updates will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.

10. CONTACT US

If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:

Arizona Home Loan Pros
Email: support@arizonahomeloanpros.com

We will respond to your inquiries promptly, typically within 30 days, as required by law.

11. IMPORTANT PRIVACY NOTICE

We Do Not Sell Your Information to Multiple Parties

Unlike many online mortgage platforms that share your information with multiple lenders, banks, or institutions, Arizona Home Loan Pros connects you directly with a single, licensed Mortgage Advisor in your market. This ensures a personalized, transparent experience, allowing you to control the next steps in your home loan journey.`}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            p: 2,
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          <Button
            onClick={() => setShowPrivacyPolicy(false)}
            sx={{
              backgroundColor: BRAND_CONFIG.colors.secondary,
              color: 'white',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              padding: '10px 24px',
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: '#0088CC',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Do Not Sell My Personal Information Modal */}
      <Dialog
        open={showDoNotSell}
        onClose={() => setShowDoNotSell(false)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#000000',
            pb: 2,
          }}
        >
          Do Not Sell My Personal Information
          <IconButton
            onClick={() => setShowDoNotSell(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            maxHeight: '70vh',
            overflow: 'auto',
            pt: 2,
            '& h3': {
              fontWeight: 700,
              mt: 2,
              mb: 1,
              fontSize: '1rem',
              color: '#000000',
            },
            '& p': {
              mb: 1.5,
              lineHeight: 1.6,
              color: '#333333',
              fontSize: '0.95rem',
            },
          }}
        >
          <Typography component="div" sx={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: 1.6, color: '#333333' }}>
{`Do Not Sell My Personal Information

At Arizona Home Loan Pros, your privacy is our priority. We do not sell your personal information to third parties for marketing or other purposes. Unlike many online mortgage platforms that share your data with multiple lenders or institutions, we connect you directly with a single, licensed Mortgage Advisor in your market for a personalized, transparent home loan experience.

This "Do Not Sell My Personal Information" notice explains our practices regarding the sale of personal information and your options for managing your data when you use our website www.arizonahomeloanpros.com, lead capture forms, or other services.

OUR COMMITMENT: NO SALE OF YOUR PERSONAL INFORMATION

We do not sell your personal information for monetary or other valuable consideration. When you provide information through our website, forms, emails, SMS, or interactions with our AI tools (e.g., Ava or Closebot), we use it only to:

• Evaluate your eligibility for mortgage products.
• Pair you with a dedicated Mortgage Advisor in your market.
• Communicate about your loan inquiry or application, including through campaigns like our nurture sequences.
• Improve our website and services.

LIMITED SHARING FOR SERVICE PURPOSES

While we do not sell your personal information, we may share it in specific cases to deliver the services you request, including:

With Trusted Partners: We may share your information with financial institutions (e.g., lenders or credit agencies) or service providers (e.g., data hosting or verification services) to process your loan application or verify details. These partners are contractually required to protect your information and use it only for our specified purposes.

For Legal Compliance: We may disclose your information to comply with federal or Arizona state laws, such as responding to subpoenas, court orders, or regulatory requirements under the Gramm-Leach-Bliley Act (GLBA) or A.R.S. § 18-551.

YOUR CHOICES AND CONTROL

You have options to manage how your information is used and shared:

Opt Out of Marketing Communications: To stop receiving promotional emails, SMS, or other marketing messages (e.g., about mortgage options or educational content):

• Click the "unsubscribe" link in our emails.
• Reply "STOP" to SMS messages.
• Contact us at support@arizonahomeloanpros.com.

Note: Opting out of marketing will not affect essential communications, such as loan application updates.

Access or Update Your Information: Request to view or correct your personal information by emailing support@arizonahomeloanpros.com. We will respond within 30 days, as required by law.

Manage Cookies and Tracking: Our website may use cookies or similar technologies to enhance your experience. You can control these through your browser settings, though disabling them may limit some website features.

WHY CHOOSE ARIZONA HOME LOAN PROS?

We stand out by connecting you with one licensed Mortgage Advisor, not multiple lenders or institutions. This focused approach ensures you control the next steps in your home loan journey with clear, personalized guidance.

CONTACT US

For questions about this notice or our data practices, please contact:

Arizona Home Loan Pros
Email: support@arizonahomeloanpros.com

We will respond to your inquiries promptly, typically within 30 days, as required by law.

UPDATES TO THIS NOTICE

We may revise this notice to reflect changes in our practices or legal requirements. Updates will be posted on this page, and we encourage you to review it periodically.`}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            p: 2,
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          <Button
            onClick={() => setShowDoNotSell(false)}
            sx={{
              backgroundColor: BRAND_CONFIG.colors.secondary,
              color: 'white',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              padding: '10px 24px',
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: '#0088CC',
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
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#000000',
            pb: 2,
          }}
        >
          Accessibility Statement
          <IconButton
            onClick={() => setShowAccessibility(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            maxHeight: '70vh',
            overflow: 'auto',
            pt: 2,
            '& h3': {
              fontWeight: 700,
              mt: 2,
              mb: 1,
              fontSize: '1rem',
              color: '#000000',
            },
            '& p': {
              mb: 1.5,
              lineHeight: 1.6,
              color: '#333333',
              fontSize: '0.95rem',
            },
          }}
        >
          <Typography component="div" sx={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: 1.6, color: '#333333' }}>
{`Accessibility Statement for Arizona Home Loan Pros

At Arizona Home Loan Pros, we are dedicated to ensuring our website www.arizonahomeloanpros.com and services are accessible to everyone, including individuals with disabilities. Our mission is to provide a seamless and inclusive experience for all users, whether you're exploring mortgage options, submitting lead capture forms, or engaging with our AI tools (e.g., Ava or Closebot).

OUR COMMITMENT TO ACCESSIBILITY

We strive to meet or exceed accessibility standards, including those outlined in the Web Content Accessibility Guidelines (WCAG) 2.1, to make our website usable for people with visual, auditory, motor, or cognitive disabilities. Our efforts include:

• Designing our website with clear navigation, readable fonts, and sufficient color contrast.
• Ensuring compatibility with assistive technologies, such as screen readers and keyboard navigation.
• Testing our website across various devices, browsers, and assistive tools to identify and address accessibility barriers.

ONGOING IMPROVEMENTS

Accessibility is an ongoing process, and we are committed to continually improving our website. We regularly review and test our site to ensure it remains user-friendly for all visitors. However, due to the dynamic nature of web technologies and the diversity of assistive devices, some users may encounter occasional challenges. If you experience any accessibility issues, we encourage you to contact us so we can assist you promptly.

THIRD-PARTY WEBSITES

Our website may include links to external sites, such as those of lenders, partners, or service providers. While we encourage these sites to prioritize accessibility, we do not control their content or practices and cannot guarantee their compliance with accessibility standards.

REQUESTING ASSISTANCE

If you have difficulty accessing any part of our website or services, or if you need assistance in an alternative format, please reach out to us. We are here to help ensure you can fully engage with our mortgage services.

CONTACT US

Arizona Home Loan Pros
Email: support@arizonahomeloanpros.com

We will respond to your accessibility inquiries promptly, typically within 30 days.

OUR PRIVACY COMMITMENT

We Protect Your Information

Unlike many online mortgage platforms that share your data with multiple lenders or institutions, Arizona Home Loan Pros connects you directly with a single, licensed Mortgage Advisor in your market. This ensures a personalized, transparent experience, allowing you to control your home loan journey.`}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            p: 2,
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          <Button
            onClick={() => setShowAccessibility(false)}
            sx={{
              backgroundColor: BRAND_CONFIG.colors.secondary,
              color: 'white',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              padding: '10px 24px',
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: '#0088CC',
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
