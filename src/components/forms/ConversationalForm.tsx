'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BRAND_CONFIG } from '@/config/brand.config';

// Form colors - using brand colors
const FORM_COLORS = {
  primary: '#00AAFF',
  primaryDark: '#0088CC',
  background: '#F2F2F2D1',
  border: '#00AAFF',
  text: '#000000',
  label: '#00AAFF',
  placeholder: '#323232',
  checked: '#0088CC',
  userMessage: '#0088CC',
  botMessage: '#F2F2F2D1',
};

// Validation schema - expanded for co-applicant and branching questions
const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  applicantType: z.string().min(1, 'Applicant type is required'),
  coApplicantFirstName: z.string().optional(),
  coApplicantLastName: z.string().optional(),
  coApplicantCreditScore: z.string().optional(),
  propertyType: z.string().min(1, 'Property type is required'),
  propertyUse: z.string().min(1, 'Property use is required'),
  purchaseTimeline: z.string().min(1, 'Purchase timeline is required'),
  openToSecondOpinion: z.string().optional(),
  reasonForSecondOpinion: z.string().optional(),
  hasRealEstateAgent: z.string().optional(),
  creditScore: z.string().min(1, 'Credit score is required'),
  purchasePrice: z.string().min(1, 'Purchase price range is required'),
  employmentStatus: z.string().min(1, 'Employment status is required'),
  selfEmployedYears: z.string().optional(),
  completedTaxes: z.string().optional(),
  monthlyIncome: z.string().min(1, 'Monthly income is required'),
  liquidAssets: z.string().min(1, 'Liquid assets is required'),
  bankruptcy: z.string().min(1, 'Bankruptcy question is required'),
  militaryService: z.string().min(1, 'Military service is required'),
  militaryStatus: z.string().optional(),
  zipCode: z.string().min(5, 'Valid zip code is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  confirmation: z.string().min(1, 'Please confirm your information'),
});

const refinanceSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  applicantType: z.string().min(1, 'Applicant type is required'),
  coApplicantFirstName: z.string().optional(),
  coApplicantLastName: z.string().optional(),
  coApplicantCreditScore: z.string().optional(),
  currentLoanStatus: z.string().min(1, 'Loan status is required'),
  refinanceReason: z.string().min(1, 'Refinance reason is required'),
  creditScore: z.string().min(1, 'Credit score is required'),
  currentHomeValue: z.string().min(1, 'Home value is required'),
  monthlyPayment: z.string().min(1, 'Monthly payment is required'),
  yearsRemainingOnLoan: z.string().min(1, 'Years remaining is required'),
  employmentStatus: z.string().min(1, 'Employment status is required'),
  selfEmployedYears: z.string().optional(),
  completedTaxes: z.string().optional(),
  monthlyIncome: z.string().min(1, 'Monthly income is required'),
  liquidAssets: z.string().min(1, 'Liquid assets is required'),
  bankruptcy: z.string().min(1, 'Bankruptcy question is required'),
  militaryService: z.string().min(1, 'Military service is required'),
  militaryStatus: z.string().optional(),
  zipCode: z.string().min(5, 'Valid zip code is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  confirmation: z.string().min(1, 'Please confirm your information'),
});

type BuyFormData = z.infer<typeof formSchema>;
type RefinanceFormData = z.infer<typeof refinanceSchema>;
type FormData = BuyFormData | RefinanceFormData;

interface ConversationalFormProps {
  formType: 'buy' | 'refinance';
  onBack: () => void;
}

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  fieldName?: string;
  isQuestion?: boolean;
}

interface ConversationStep {
  id: string;
  fieldName: string;
  botMessage: ((formData: Partial<FormData>) => string) | string;
  options?: Array<{ value: string; label: string }>;
  isTextInput?: boolean;
  isEmail?: boolean;
  isPhone?: boolean;
  validation?: (value: string) => boolean;
  shouldShow?: (formData: Partial<FormData>) => boolean;
  nextStepId?: (value: string, formData: Partial<FormData>) => string | null;
}

// Build buy conversation steps with branching logic
const getBuyConversationSteps = (): ConversationStep[] => [
  {
    id: 'firstName',
    fieldName: 'firstName',
    botMessage: "Hi there! 👋 What's your first name?",
    isTextInput: true,
    validation: (value) => value.length >= 2,
  },
  {
    id: 'lastName',
    fieldName: 'lastName',
    botMessage: "Nice to meet you! What's your last name?",
    isTextInput: true,
    validation: (value) => value.length >= 2,
  },
  {
    id: 'applicantType',
    fieldName: 'applicantType',
    botMessage: (data) =>
      `Thank you, ${data.firstName}! Are you looking to buy a home by yourself or do you have a co-applicant?`,
    options: [
      { value: 'individual', label: 'Just myself' },
      { value: 'co-applicant', label: 'I have a co-applicant' },
    ],
  },
  {
    id: 'creditScore',
    fieldName: 'creditScore',
    botMessage: 'What is your current credit score?',
    options: [
      { value: 'less-580', label: 'Less than 580' },
      { value: '580-619', label: '580 to 619' },
      { value: '620-639', label: '620 to 639' },
      { value: '640-659', label: '640 to 659' },
      { value: '660-679', label: '660 to 679' },
      { value: '680-699', label: '680 to 699' },
      { value: '700-719', label: '700 to 719' },
      { value: '720-760', label: '720 to 760' },
      { value: '760+', label: '760 and above' },
    ],
  },
  {
    id: 'coApplicantFirstName',
    fieldName: 'coApplicantFirstName',
    botMessage: "What's your co-applicant's first name?",
    isTextInput: true,
    validation: (value) => value.length >= 2,
    shouldShow: (data) => data.applicantType === 'co-applicant',
  },
  {
    id: 'coApplicantLastName',
    fieldName: 'coApplicantLastName',
    botMessage: "What's your co-applicant's last name?",
    isTextInput: true,
    validation: (value) => value.length >= 2,
    shouldShow: (data) => data.applicantType === 'co-applicant',
  },
  {
    id: 'propertyType',
    fieldName: 'propertyType',
    botMessage: (data) => `Great! What type of property are you looking to buy, ${data.firstName}?`,
    options: [
      { value: 'existing-single-family', label: 'Existing Single Family Home' },
      { value: 'townhome-condo', label: 'Townhome/Condo' },
      { value: 'lot-land', label: 'Lot/Land' },
      { value: 'multifamily', label: 'Multifamily (2-4 Unit)' },
    ],
  },
  {
    id: 'propertyUse',
    fieldName: 'propertyUse',
    botMessage: 'How will this home be used?',
    options: [
      { value: 'primary-home', label: 'Primary Home' },
      { value: 'second-home', label: 'Second Home' },
      { value: 'investment', label: 'Investment Property' },
      { value: 'vacation-home', label: 'Vacation Home' },
    ],
  },
  {
    id: 'purchaseTimeline',
    fieldName: 'purchaseTimeline',
    botMessage: 'Where are you in the home buying process?',
    options: [
      { value: 'signed-purchase', label: 'Signed Purchase Agreement' },
      { value: 'offer-pending', label: 'Offer Pending/Found Property' },
      { value: 'buying-2-6-months', label: 'Buying in 2-6 Months' },
      { value: 'simply-curious', label: 'Simply Curious' },
    ],
    nextStepId: (value) => {
      if (value === 'signed-purchase' || value === 'offer-pending') {
        return 'openToSecondOpinion';
      }
      return 'hasRealEstateAgent';
    },
  },
  {
    id: 'openToSecondOpinion',
    fieldName: 'openToSecondOpinion',
    botMessage:
      "Are you open to getting a second opinion from a lender about your current loan offer or terms?",
    options: [
      { value: 'yes', label: 'Yes, I am open to it' },
      { value: 'no', label: 'No, I am satisfied' },
    ],
    shouldShow: (data) => {
      const timeline = (data as any).purchaseTimeline;
      return timeline === 'signed-purchase' || timeline === 'offer-pending';
    },
  },
  {
    id: 'reasonForSecondOpinion',
    fieldName: 'reasonForSecondOpinion',
    botMessage:
      'What are your main reasons for seeking a second opinion? (Select the best option)',
    options: [
      { value: 'better-rate', label: 'Find a better interest rate' },
      { value: 'lower-payment', label: 'Reduce monthly payment' },
      { value: 'better-terms', label: 'Get better loan terms' },
      { value: 'more-options', label: 'Explore more loan options' },
      { value: 'save-money', label: 'Save money on closing costs' },
    ],
    shouldShow: (data) => {
      const timeline = (data as any).purchaseTimeline;
      return timeline === 'signed-purchase' || timeline === 'offer-pending';
    },
    nextStepId: () => 'purchasePrice',
  },
  {
    id: 'hasRealEstateAgent',
    fieldName: 'hasRealEstateAgent',
    botMessage: 'Do you have a real estate agent helping you?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    shouldShow: (data) => {
      const timeline = (data as any).purchaseTimeline;
      return timeline === 'buying-2-6-months' || timeline === 'simply-curious';
    },
  },
  {
    id: 'purchasePrice',
    fieldName: 'purchasePrice',
    botMessage: "What is the price range of homes you've been looking for?",
    options: [
      { value: '0-200k', label: '$200,000 or less' },
      { value: '201k-500k', label: '$201,000 to $500,000' },
      { value: '501k-800k', label: '$501,000 to $800,000' },
      { value: '801k-1.1m', label: '$801,000 to $1,100,000' },
      { value: '1.2m+', label: '$1,200,000 or above' },
    ],
  },
  {
    id: 'employmentStatus',
    fieldName: 'employmentStatus',
    botMessage: 'What is your employment status?',
    options: [
      { value: 'employed', label: 'Employed' },
      { value: 'self-employed', label: 'Self-Employed' },
      { value: 'retired', label: 'Retired' },
      { value: 'not-employed', label: 'Not Employed' },
    ],
    nextStepId: (value) => (value === 'self-employed' ? 'selfEmployedYears' : 'monthlyIncome'),
  },
  {
    id: 'selfEmployedYears',
    fieldName: 'selfEmployedYears',
    botMessage: 'Have you been self-employed for 2 or more years?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    shouldShow: (data) => data.employmentStatus === 'self-employed',
  },
  {
    id: 'completedTaxes',
    fieldName: 'completedTaxes',
    botMessage: 'Do you have your last two years of taxes completed?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    shouldShow: (data) => data.employmentStatus === 'self-employed',
  },
  {
    id: 'monthlyIncome',
    fieldName: 'monthlyIncome',
    botMessage: 'How much does your household make per month?',
    options: [
      { value: 'less-500', label: 'Less than $500' },
      { value: '500-2499', label: '$500 - $2,499' },
      { value: '2500-3499', label: '$2,500 - $3,499' },
      { value: '3500-3999', label: '$3,500 - $3,999' },
      { value: '4000-4999', label: '$4,000 - $4,999' },
      { value: '5000-5999', label: '$5,000 - $5,999' },
      { value: '6000-6999', label: '$6,000 - $6,999' },
      { value: '7000-9999', label: '$7,000 - $9,999' },
      { value: '10000-14999', label: '$10,000 - $14,999' },
      { value: '15000+', label: '$15,000 or above' },
    ],
  },
  {
    id: 'liquidAssets',
    fieldName: 'liquidAssets',
    botMessage: 'How much liquid assets (savings/investments) do you have available?',
    options: [
      { value: '0-4999', label: '$0 to $4,999' },
      { value: '5000-9999', label: '$5,000 to $9,999' },
      { value: '10000-19999', label: '$10,000 to $19,999' },
      { value: '20000+', label: '$20,000 and above' },
    ],
  },
  {
    id: 'bankruptcy',
    fieldName: 'bankruptcy',
    botMessage: 'Bankruptcy, short sale, or foreclosure in last 3 years?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    id: 'militaryService',
    fieldName: 'militaryService',
    botMessage: 'Military service?',
    options: [
      { value: 'no-service', label: 'No military service' },
      { value: 'yes-served', label: 'Yes, I (or my spouse) served' },
    ],
    nextStepId: (value) => (value === 'yes-served' ? 'militaryStatus' : 'zipCode'),
  },
  {
    id: 'militaryStatus',
    fieldName: 'militaryStatus',
    botMessage: 'Select your military status:',
    options: [
      { value: 'active-duty', label: 'Active Duty' },
      { value: 'reserve', label: 'Reserve Status' },
      { value: 'veteran', label: 'Veteran' },
    ],
    shouldShow: (data) => data.militaryService === 'yes-served',
  },
  {
    id: 'zipCode',
    fieldName: 'zipCode',
    botMessage: 'What is your zip code?',
    isTextInput: true,
    validation: (value) => value.length === 5 || value.length === 9,
  },
  {
    id: 'email',
    fieldName: 'email',
    botMessage: 'What is your best email address?',
    isEmail: true,
    isTextInput: true,
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  {
    id: 'phone',
    fieldName: 'phone',
    botMessage: 'What is your best contact number?',
    isPhone: true,
    isTextInput: true,
    validation: (value) => /^\d{10,}$/.test(value.replace(/\D/g, '')),
  },
  {
    id: 'confirmation',
    fieldName: 'confirmation',
    botMessage: `Perfect! Is everything accurate? Let's get started on our process to help you in your journey to home ownership.`,
    options: [
      { value: 'yes', label: 'I confirm this is accurate' },
      { value: 'no', label: 'Let me edit my answers' },
    ],
  },
];

// Build refinance conversation steps with branching logic
const getRefinanceConversationSteps = (): ConversationStep[] => [
  {
    id: 'firstName',
    fieldName: 'firstName',
    botMessage: "Hi there! 👋 What's your first name?",
    isTextInput: true,
    validation: (value) => value.length >= 2,
  },
  {
    id: 'lastName',
    fieldName: 'lastName',
    botMessage: "Nice to meet you! What's your last name?",
    isTextInput: true,
    validation: (value) => value.length >= 2,
  },
  {
    id: 'applicantType',
    fieldName: 'applicantType',
    botMessage: (data) =>
      `Thank you, ${data.firstName}! Are you refinancing by yourself or do you have a co-applicant?`,
    options: [
      { value: 'individual', label: 'Just myself' },
      { value: 'co-applicant', label: 'I have a co-applicant' },
    ],
    nextStepId: (value) => (value === 'co-applicant' ? 'coApplicantFirstName' : 'currentLoanStatus'),
  },
  {
    id: 'coApplicantFirstName',
    fieldName: 'coApplicantFirstName',
    botMessage: "What's your co-applicant's first name?",
    isTextInput: true,
    validation: (value) => value.length >= 2,
    shouldShow: (data) => data.applicantType === 'co-applicant',
  },
  {
    id: 'coApplicantLastName',
    fieldName: 'coApplicantLastName',
    botMessage: "What's your co-applicant's last name?",
    isTextInput: true,
    validation: (value) => value.length >= 2,
    shouldShow: (data) => data.applicantType === 'co-applicant',
  },
  {
    id: 'coApplicantCreditScore',
    fieldName: 'coApplicantCreditScore',
    botMessage: "What is your co-applicant's credit score?",
    options: [
      { value: 'less-580', label: 'Less than 580' },
      { value: '580-619', label: '580 to 619' },
      { value: '620-639', label: '620 to 639' },
      { value: '640-659', label: '640 to 659' },
      { value: '660-679', label: '660 to 679' },
      { value: '680-699', label: '680 to 699' },
      { value: '700-719', label: '700 to 719' },
      { value: '720-760', label: '720 to 760' },
      { value: '760+', label: '760 and above' },
    ],
    shouldShow: (data) => data.applicantType === 'co-applicant',
  },
  {
    id: 'currentLoanStatus',
    fieldName: 'currentLoanStatus',
    botMessage: (data) => `Great! ${data.firstName}, what is your current loan status?`,
    options: [
      { value: 'current', label: 'Current on Payments' },
      { value: 'behind', label: 'Behind on Payments' },
      { value: 'about-to-default', label: 'About to Default' },
    ],
  },
  {
    id: 'refinanceReason',
    fieldName: 'refinanceReason',
    botMessage: 'What is your main reason for refinancing?',
    options: [
      { value: 'lower-rate', label: 'Lower Interest Rate' },
      { value: 'lower-payment', label: 'Lower Monthly Payment' },
      { value: 'cash-out', label: 'Cash Out' },
      { value: 'shorten-term', label: 'Shorten Loan Term' },
      { value: 'change-type', label: 'Change Loan Type' },
    ],
  },
  {
    id: 'creditScore',
    fieldName: 'creditScore',
    botMessage: 'What is your current credit score?',
    options: [
      { value: 'less-580', label: 'Less than 580' },
      { value: '580-619', label: '580 to 619' },
      { value: '620-639', label: '620 to 639' },
      { value: '640-659', label: '640 to 659' },
      { value: '660-679', label: '660 to 679' },
      { value: '680-699', label: '680 to 699' },
      { value: '700-719', label: '700 to 719' },
      { value: '720-760', label: '720 to 760' },
      { value: '760+', label: '760 and above' },
    ],
  },
  {
    id: 'currentHomeValue',
    fieldName: 'currentHomeValue',
    botMessage: 'What is your current home value?',
    options: [
      { value: '0-200k', label: '$200,000 or less' },
      { value: '201k-500k', label: '$201,000 to $500,000' },
      { value: '501k-800k', label: '$501,000 to $800,000' },
      { value: '801k-1.1m', label: '$801,000 to $1,100,000' },
      { value: '1.2m+', label: '$1,200,000 or above' },
    ],
  },
  {
    id: 'monthlyPayment',
    fieldName: 'monthlyPayment',
    botMessage: 'What is your current monthly payment?',
    options: [
      { value: 'less-1k', label: 'Less than $1,000' },
      { value: '1k-2k', label: '$1,000 - $2,000' },
      { value: '2k-3k', label: '$2,000 - $3,000' },
      { value: '3k-4k', label: '$3,000 - $4,000' },
      { value: '4k+', label: '$4,000 or more' },
    ],
  },
  {
    id: 'yearsRemainingOnLoan',
    fieldName: 'yearsRemainingOnLoan',
    botMessage: 'How many years are remaining on your loan?',
    options: [
      { value: 'less-5', label: 'Less than 5 years' },
      { value: '5-10', label: '5 to 10 years' },
      { value: '10-15', label: '10 to 15 years' },
      { value: '15-20', label: '15 to 20 years' },
      { value: '20-25', label: '20 to 25 years' },
      { value: '25+', label: '25+ years' },
    ],
  },
  {
    id: 'employmentStatus',
    fieldName: 'employmentStatus',
    botMessage: 'What is your employment status?',
    options: [
      { value: 'employed', label: 'Employed' },
      { value: 'self-employed', label: 'Self-Employed' },
      { value: 'retired', label: 'Retired' },
      { value: 'not-employed', label: 'Not Employed' },
    ],
    nextStepId: (value) => (value === 'self-employed' ? 'selfEmployedYears' : 'monthlyIncome'),
  },
  {
    id: 'selfEmployedYears',
    fieldName: 'selfEmployedYears',
    botMessage: 'Have you been self-employed for 2 or more years?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    shouldShow: (data) => data.employmentStatus === 'self-employed',
  },
  {
    id: 'completedTaxes',
    fieldName: 'completedTaxes',
    botMessage: 'Do you have your last two years of taxes completed?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    shouldShow: (data) => data.employmentStatus === 'self-employed',
  },
  {
    id: 'monthlyIncome',
    fieldName: 'monthlyIncome',
    botMessage: 'How much does your household make per month?',
    options: [
      { value: 'less-500', label: 'Less than $500' },
      { value: '500-2499', label: '$500 - $2,499' },
      { value: '2500-3499', label: '$2,500 - $3,499' },
      { value: '3500-3999', label: '$3,500 - $3,999' },
      { value: '4000-4999', label: '$4,000 - $4,999' },
      { value: '5000-5999', label: '$5,000 - $5,999' },
      { value: '6000-6999', label: '$6,000 - $6,999' },
      { value: '7000-9999', label: '$7,000 - $9,999' },
      { value: '10000-14999', label: '$10,000 - $14,999' },
      { value: '15000+', label: '$15,000 or above' },
    ],
  },
  {
    id: 'liquidAssets',
    fieldName: 'liquidAssets',
    botMessage: 'How much liquid assets (savings/investments) do you have available?',
    options: [
      { value: '0-4999', label: '$0 to $4,999' },
      { value: '5000-9999', label: '$5,000 to $9,999' },
      { value: '10000-19999', label: '$10,000 to $19,999' },
      { value: '20000+', label: '$20,000 and above' },
    ],
  },
  {
    id: 'bankruptcy',
    fieldName: 'bankruptcy',
    botMessage: 'Bankruptcy, short sale, or foreclosure in last 3 years?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    id: 'militaryService',
    fieldName: 'militaryService',
    botMessage: 'Military service?',
    options: [
      { value: 'no-service', label: 'No military service' },
      { value: 'yes-served', label: 'Yes, I (or my spouse) served' },
    ],
    nextStepId: (value) => (value === 'yes-served' ? 'militaryStatus' : 'zipCode'),
  },
  {
    id: 'militaryStatus',
    fieldName: 'militaryStatus',
    botMessage: 'Select your military status:',
    options: [
      { value: 'active-duty', label: 'Active Duty' },
      { value: 'reserve', label: 'Reserve Status' },
      { value: 'veteran', label: 'Veteran' },
    ],
    shouldShow: (data) => data.militaryService === 'yes-served',
  },
  {
    id: 'zipCode',
    fieldName: 'zipCode',
    botMessage: 'What is your zip code?',
    isTextInput: true,
    validation: (value) => value.length === 5 || value.length === 9,
  },
  {
    id: 'email',
    fieldName: 'email',
    botMessage: 'What is your best email address?',
    isEmail: true,
    isTextInput: true,
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  {
    id: 'phone',
    fieldName: 'phone',
    botMessage: 'What is your best contact number?',
    isPhone: true,
    isTextInput: true,
    validation: (value) => /^\d{10,}$/.test(value.replace(/\D/g, '')),
  },
  {
    id: 'confirmation',
    fieldName: 'confirmation',
    botMessage: `Perfect! Is everything accurate? Let's get started on our process to help you refinance your home.`,
    options: [
      { value: 'yes', label: 'I confirm this is accurate' },
      { value: 'no', label: 'Let me edit my answers' },
    ],
  },
];

export function ConversationalForm({ formType, onBack }: ConversationalFormProps) {
  const schema = formType === 'buy' ? formSchema : refinanceSchema;

  const { control, watch, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepIds, setStepIds] = useState<string[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const formData = watch();

  // Get all available conversation steps
  const getAllSteps = () => {
    return formType === 'buy' ? getBuyConversationSteps() : getRefinanceConversationSteps();
  };

  // Get all step IDs in order (don't filter by shouldShow here, that's done during rendering)
  const getAllStepIds = (): string[] => {
    const steps = getAllSteps();
    return steps.map((s) => s.id);
  };

  // Initialize step sequence
  useEffect(() => {
    const steps = getAllSteps();
    const allStepIds = steps.map((s) => s.id);
    setStepIds(allStepIds);

    if (messages.length === 0 && allStepIds.length > 0) {
      const firstStep = steps.find((s) => s.id === allStepIds[0]);
      if (firstStep) {
        startTypingMessage(firstStep);
      }
    }
  }, []);

  // Note: Step sequence is built on initial mount and dynamically determined
  // when moving between steps. We don't need to rebuild it on every formData change
  // as that would cause an infinite loop (formData is a new object on each render)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, displayedText]);

  // Typing animation
  const startTypingMessage = (step: ConversationStep) => {
    setIsTyping(true);
    setDisplayedText(''); // Start with empty text so first character appears immediately
    const messageText =
      typeof step.botMessage === 'function' ? step.botMessage(formData) : step.botMessage;
    let charIndex = 0;

    if (typeIntervalRef.current) {
      clearInterval(typeIntervalRef.current);
    }

    typeIntervalRef.current = setInterval(() => {
      if (charIndex < messageText.length) {
        setDisplayedText(messageText.substring(0, charIndex + 1));
        charIndex++;
      } else {
        if (typeIntervalRef.current) {
          clearInterval(typeIntervalRef.current);
        }
        // Add message and clear displayed text
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: 'bot',
            content: messageText,
            fieldName: step.fieldName,
            isQuestion: true,
          },
        ]);
        setDisplayedText('');
        setIsTyping(false);
      }
    }, 30);
  };

  const getCurrentStep = (): ConversationStep | null => {
    const steps = getAllSteps();

    // Start from current index and find the first visible step
    for (let i = currentStepIndex; i < stepIds.length; i++) {
      const stepId = stepIds[i];
      const step = steps.find((s) => s.id === stepId);

      if (!step) continue;

      // Check if step should be shown
      if (!step.shouldShow || step.shouldShow(formData)) {
        // This step should be shown, return it
        return step;
      }
      // Otherwise, keep looking at the next step in the loop
    }

    return null;
  };

  const handleOptionSelect = (value: string) => {
    const currentStep = getCurrentStep();
    if (!currentStep) return;

    const optionLabel =
      currentStep.options?.find((opt) => opt.value === value)?.label || value;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'user',
        content: optionLabel,
        fieldName: currentStep.fieldName,
      },
    ]);

    // Update form data
    const updatedData = { ...formData, [currentStep.fieldName]: value };
    setValue(currentStep.fieldName as any, value);

    // If this is the confirmation step and user confirms, submit the form
    if (currentStep.id === 'confirmation' && value === 'yes') {
      setTimeout(() => {
        onSubmit();
      }, 500);
      return;
    }

    const steps = getAllSteps();
    const currentIndexInArray = stepIds.indexOf(currentStep.id);

    // Determine the NEXT step ID based on branching logic
    let targetStepId: string | null = null;

    if (currentStep.nextStepId) {
      // Use the branching function to determine next step
      targetStepId = currentStep.nextStepId(value, updatedData);
    } else if (currentIndexInArray >= 0 && currentIndexInArray < stepIds.length - 1) {
      // No branching, just go to next in array
      targetStepId = stepIds[currentIndexInArray + 1];
    }

    // Find the target step and get its index
    if (targetStepId) {
      const targetStepIndex = stepIds.indexOf(targetStepId);

      if (targetStepIndex >= 0) {
        // Search forward from target to find first visible step
        let nextVisibleStepIndex = targetStepIndex;
        let nextVisibleStep: ConversationStep | null = null;

        while (nextVisibleStepIndex < stepIds.length) {
          const stepId = stepIds[nextVisibleStepIndex];
          const step = steps.find((s) => s.id === stepId);

          if (step && (!step.shouldShow || step.shouldShow(updatedData))) {
            nextVisibleStep = step;
            break;
          }
          nextVisibleStepIndex++;
        }

        if (nextVisibleStep) {
          // Set transitioning flag to prevent options from showing
          setIsTransitioning(true);
          setCurrentStepIndex(nextVisibleStepIndex);
          // Small delay to allow state updates to batch before starting typing
          setTimeout(() => {
            startTypingMessage(nextVisibleStep);
            setIsTransitioning(false);
          }, 0);
        }
      }
    } else {
      // Form complete
      const finalMessage = typeof currentStep.botMessage === 'function'
        ? currentStep.botMessage(updatedData)
        : currentStep.botMessage;
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: finalMessage,
          isQuestion: false,
        },
      ]);
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;

    const currentStep = getCurrentStep();
    if (!currentStep) return;

    const trimmedInput = textInput.trim();

    if (currentStep.validation && !currentStep.validation(trimmedInput)) {
      alert(`Please enter a valid ${currentStep.fieldName}`);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'user',
        content: trimmedInput,
        fieldName: currentStep.fieldName,
      },
    ]);

    // Update form data
    const updatedData = { ...formData, [currentStep.fieldName]: trimmedInput };
    setValue(currentStep.fieldName as any, trimmedInput);
    setTextInput('');

    const steps = getAllSteps();
    const currentIndexInArray = stepIds.indexOf(currentStep.id);

    // Determine the NEXT step ID based on branching logic
    let targetStepId: string | null = null;

    if (currentStep.nextStepId) {
      // Use the branching function to determine next step
      targetStepId = currentStep.nextStepId(trimmedInput, updatedData);
    } else if (currentIndexInArray >= 0 && currentIndexInArray < stepIds.length - 1) {
      // No branching, just go to next in array
      targetStepId = stepIds[currentIndexInArray + 1];
    }

    // Find the target step and get its index
    if (targetStepId) {
      const targetStepIndex = stepIds.indexOf(targetStepId);

      if (targetStepIndex >= 0) {
        // Search forward from target to find first visible step
        let nextVisibleStepIndex = targetStepIndex;
        let nextVisibleStep: ConversationStep | null = null;

        while (nextVisibleStepIndex < stepIds.length) {
          const stepId = stepIds[nextVisibleStepIndex];
          const step = steps.find((s) => s.id === stepId);

          if (step && (!step.shouldShow || step.shouldShow(updatedData))) {
            nextVisibleStep = step;
            break;
          }
          nextVisibleStepIndex++;
        }

        if (nextVisibleStep) {
          // Set transitioning flag to prevent options from showing
          setIsTransitioning(true);
          setCurrentStepIndex(nextVisibleStepIndex);
          // Small delay to allow state updates to batch before starting typing
          setTimeout(() => {
            startTypingMessage(nextVisibleStep);
            setIsTransitioning(false);
          }, 0);
        }
      }
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formType,
        }),
      });

      if (response.ok) {
        window.location.href = '/submitted';
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormComplete = currentStepIndex === stepIds.length - 1 && formData.confirmation === 'yes';
  const currentStep = getCurrentStep();
  const isLastStep = currentStepIndex === stepIds.length - 1;

  if (!currentStep) {
    return <Typography>Loading form...</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafb 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header with back button */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'white',
          borderBottom: `2px solid ${FORM_COLORS.border}`,
        }}
      >
        <Button
          onClick={onBack}
          sx={{
            color: FORM_COLORS.primary,
            minWidth: '48px',
            minHeight: '48px',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            '&:active': {
              backgroundColor: 'rgba(0, 170, 255, 0.1)',
            },
            '&:hover': {
              backgroundColor: 'rgba(0, 170, 255, 0.08)',
            },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
        </Button>
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: FORM_COLORS.primary,
            ml: 2,
          }}
        >
          {formType === 'buy' ? 'Buy a Home' : 'Refinance My Home'} - Chat
        </Typography>
      </Box>

      {/* Chat container */}
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          py: 4,
          overflow: 'hidden',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: { xs: 'calc(100vh - 180px)', sm: 'calc(100vh - 200px)' },
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
        >
          {/* Messages area */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              backgroundColor: '#FAFAFA',
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                {message.type === 'bot' && (
                  <Box
                    sx={{
                      width: { xs: '36px', sm: '32px' },
                      height: { xs: '36px', sm: '32px' },
                      minWidth: { xs: '36px', sm: '32px' },
                      minHeight: { xs: '36px', sm: '32px' },
                      borderRadius: '50%',
                      backgroundColor: FORM_COLORS.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      flexShrink: 0,
                      fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    }}
                  >
                    🤖
                  </Box>
                )}

                <Box
                  sx={{
                    maxWidth: { xs: '85%', sm: '70%' },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      backgroundColor:
                        message.type === 'user'
                          ? FORM_COLORS.userMessage
                          : FORM_COLORS.botMessage,
                      color: message.type === 'user' ? 'white' : 'black',
                      wordBreak: 'break-word',
                      lineHeight: 1.5,
                    }}
                  >
                    {message.content}
                  </Box>
                </Box>

                {message.type === 'user' && (
                  <Box
                    sx={{
                      width: { xs: '36px', sm: '32px' },
                      height: { xs: '36px', sm: '32px' },
                      minWidth: { xs: '36px', sm: '32px' },
                      minHeight: { xs: '36px', sm: '32px' },
                      borderRadius: '50%',
                      backgroundColor: FORM_COLORS.checked,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      flexShrink: 0,
                      fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    }}
                  >
                    👤
                  </Box>
                )}
              </Box>
            ))}

            {/* Typing message display */}
            {isTyping && displayedText && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: { xs: '36px', sm: '32px' },
                    height: { xs: '36px', sm: '32px' },
                    minWidth: { xs: '36px', sm: '32px' },
                    minHeight: { xs: '36px', sm: '32px' },
                    borderRadius: '50%',
                    backgroundColor: FORM_COLORS.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                  }}
                >
                  🤖
                </Box>
                <Box
                  sx={{
                    maxWidth: { xs: '85%', sm: '70%' },
                    p: 2,
                    borderRadius: '12px',
                    backgroundColor: FORM_COLORS.botMessage,
                    color: 'black',
                    wordBreak: 'break-word',
                    lineHeight: 1.5,
                  }}
                >
                  {displayedText}
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: '8px',
                      height: '16px',
                      backgroundColor: 'black',
                      ml: 0.5,
                      animation: 'blink 1s infinite',
                      '@keyframes blink': {
                        '0%': { opacity: 1 },
                        '50%': { opacity: 0 },
                        '100%': { opacity: 1 },
                      },
                    }}
                  />
                </Box>
              </Box>
            )}

            {isSubmitting && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  p: 2,
                }}
              >
                <CircularProgress size={24} sx={{ color: FORM_COLORS.primary }} />
                <Typography sx={{ color: FORM_COLORS.primary }}>Submitting...</Typography>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Input area */}
          {!isFormComplete && !isTyping && !isTransitioning && (
            <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'white', borderTop: `1px solid ${FORM_COLORS.border}`, maxHeight: '40vh', overflowY: 'auto' }}>
              {currentStep.options && !isLastStep ? (
                // Options display
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: currentStep.options.length > 3 ? '1fr 1fr' : '1fr',
                      sm: currentStep.options.length > 4 ? '1fr 1fr' : '1fr'
                    },
                    gap: { xs: 1.5, sm: 2 },
                  }}
                >
                  {currentStep.options.map((option) => (
                    <Button
                      key={option.value}
                      onClick={() => handleOptionSelect(option.value)}
                      sx={{
                        p: { xs: '12px 16px', sm: '15px 20px' },
                        minHeight: { xs: '48px', sm: '44px' },
                        border: `2px solid ${FORM_COLORS.border}`,
                        backgroundColor: FORM_COLORS.background,
                        color: FORM_COLORS.text,
                        borderRadius: '12px',
                        textAlign: 'center',
                        fontSize: { xs: '0.875rem', sm: '0.95rem' },
                        fontWeight: 500,
                        textTransform: 'none',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:active': {
                          backgroundColor: 'white',
                          color: FORM_COLORS.primary,
                          borderColor: FORM_COLORS.primary,
                          transform: 'scale(0.98)',
                        },
                        '&:hover': {
                          backgroundColor: 'white',
                          color: FORM_COLORS.primary,
                          borderColor: FORM_COLORS.primary,
                        },
                      }}
                    >
                      {option.label}
                    </Button>
                  ))}
                </Box>
              ) : currentStep.isTextInput ? (
                // Text input display
                <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    fullWidth
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                    placeholder={`Enter your ${currentStep.fieldName}...`}
                    type={
                      currentStep.isEmail ? 'email' : currentStep.isPhone ? 'tel' : 'text'
                    }
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        minHeight: '48px',
                        borderRadius: '12px',
                        backgroundColor: FORM_COLORS.background,
                        '& fieldset': {
                          borderColor: FORM_COLORS.border,
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: FORM_COLORS.primaryDark,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: FORM_COLORS.primary,
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: FORM_COLORS.text,
                        fontSize: '16px',
                        padding: { xs: '12px 16px', sm: '15px 20px' },
                        '&::placeholder': {
                          color: FORM_COLORS.placeholder,
                          opacity: 1,
                        },
                      },
                    }}
                  />
                  <Button
                    onClick={handleTextSubmit}
                    disabled={!textInput.trim()}
                    sx={{
                      p: { xs: '12px 20px', sm: '15px 30px' },
                      minHeight: { xs: '48px', sm: 'auto' },
                      minWidth: { xs: '100%', sm: '120px' },
                      backgroundColor: FORM_COLORS.primary,
                      color: 'white',
                      borderRadius: '12px',
                      fontWeight: 700,
                      textTransform: 'none',
                      whiteSpace: 'nowrap',
                      fontSize: { xs: '0.95rem', sm: '1rem' },
                      transition: 'all 0.2s ease',
                      '&:active': {
                        backgroundColor: FORM_COLORS.primaryDark,
                        transform: 'scale(0.98)',
                      },
                      '&:hover': {
                        backgroundColor: FORM_COLORS.primaryDark,
                      },
                      '&:disabled': {
                        backgroundColor: '#ccc',
                        color: '#666',
                      },
                    }}
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </Box>
              ) : (
                // Options for confirmation (yes/no)
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: { xs: 1.5, sm: 2 } }}>
                  {currentStep.options?.map((option) => (
                    <Button
                      key={option.value}
                      onClick={() => handleOptionSelect(option.value)}
                      sx={{
                        p: { xs: '12px 16px', sm: '15px 20px' },
                        minHeight: { xs: '48px', sm: '44px' },
                        border: `2px solid ${FORM_COLORS.border}`,
                        backgroundColor: FORM_COLORS.background,
                        color: FORM_COLORS.text,
                        borderRadius: '12px',
                        textAlign: 'center',
                        fontSize: { xs: '0.875rem', sm: '0.95rem' },
                        fontWeight: 500,
                        textTransform: 'none',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:active': {
                          backgroundColor: 'white',
                          color: FORM_COLORS.primary,
                          borderColor: FORM_COLORS.primary,
                          transform: 'scale(0.98)',
                        },
                        '&:hover': {
                          backgroundColor: 'white',
                          color: FORM_COLORS.primary,
                          borderColor: FORM_COLORS.primary,
                        },
                      }}
                    >
                      {option.label}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          )}

        </Paper>
      </Container>
    </Box>
  );
}
