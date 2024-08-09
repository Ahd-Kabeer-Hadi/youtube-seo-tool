import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
            Privacy Policy
          </h1>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-lg">
                1. Introduction
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <p className="mb-4">
                  <strong>Overview:</strong> This Privacy Policy explains how Fozato Pvt Ltd collects, uses, and protects user information when they use the Fozato YouTube Tool.
                </p>
                <p>
                  <strong>Commitment:</strong> Fozato Pvt Ltd is committed to safeguarding user privacy and ensuring the protection of personal data.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold text-lg">
                2. Information Collection
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <p className="mb-4">
                  <strong>Personal Information:</strong> Fozato Pvt Ltd collects personal information such as name, email, and YouTube account data via Google OAuth and the YouTube API.
                </p>
                <p>
                  <strong>Collection Methods:</strong> Information is collected through user forms, Google authentication, and interactions with the YouTube API.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold text-lg">
                3. Information Usage
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <p className="mb-4">
                  <strong>Service Provision:</strong> The collected information is used to authenticate users, display YouTube channel data, perform keyword research, and upload videos.
                </p>
                <p>
                  <strong>Marketing:</strong> User information may also be used for marketing purposes, such as sending updates or promotional offers, with the user's consent.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-semibold text-lg">
                4. Data Sharing
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <p>
                  <strong>Third-Party Disclosure:</strong> Fozato Pvt Ltd may share data with service providers who assist in operating the tool, such as cloud hosting services. No data is sold to third parties.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="font-semibold text-lg">
                5. Data Security
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <p>
                  <strong>Security Measures:</strong> Fozato Pvt Ltd employs encryption, firewalls, and other security measures to protect user data from unauthorized access.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="font-semibold text-lg">
                6. Data Retention
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <p>
                  <strong>Storage Duration:</strong> User data is stored for as long as necessary to provide the service or as required by law. Users may request deletion of their data at any time.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger className="font-semibold text-lg">
                7. User Rights
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <p>
                  <strong>Access and Rectification:</strong> Users have the right to access, rectify, or delete their personal data. They may also restrict processing or request data portability.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger className="font-semibold text-lg">
                8. Children's Privacy
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <p>
                  <strong>Compliance:</strong> The service is not intended for children under 13, and Fozato Pvt Ltd complies with applicable children's privacy laws.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger className="font-semibold text-lg">
                9. Changes to the Privacy Policy
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <p>
                  <strong>Communication of Changes:</strong> Any changes to this Privacy Policy will be communicated to users via email or through notifications on the tool's interface.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger className="font-semibold text-lg">
                10. Contact Information
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <p>
                  <strong>Privacy Inquiries:</strong> For privacy-related inquiries, users can contact Fozato Pvt Ltd at:<br />
                  Address: WS_VO/639 1st floor, cc54, 2593-5, Bose Nagar, Elamkulam, Kochi, Kerala-682020, India
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )
}

export default PrivacyPolicy
