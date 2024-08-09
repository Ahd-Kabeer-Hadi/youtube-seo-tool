import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Toc() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Terms and Conditions
      </h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold text-lg">
            1. Introduction
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            <p className="mb-4">
              <strong>Brief Overview:</strong> Fozato Pvt Ltd's YouTube Tool is
              designed to enhance the YouTube experience by allowing users to
              authenticate their accounts, analyze their channel’s performance,
              conduct keyword research, and upload videos directly to their
              channel. The tool aims to streamline YouTube channel management,
              offering users a comprehensive suite of features that integrate
              seamlessly with the YouTube API.
            </p>
            <p>
              <strong>Definition of Key Terms:</strong>
              <br />
              <strong>User:</strong> An individual who registers and logs into
              the Fozato tool to manage their YouTube channel.
              <br />
              <strong>Data:</strong> Any information collected from the user,
              including but not limited to personal details, YouTube channel
              statistics, and video content.
              <br />
              <strong>Service:</strong> The functionalities provided by the
              Fozato YouTube Tool, including authentication, channel overview
              display, keyword research, and video upload.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold text-lg">
            2. Scope of Service
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            <p className="mb-4">
              <strong>Tool’s Functionalities:</strong> The Fozato YouTube Tool
              provides the following functionalities:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>
                User Authentication: Secure login to YouTube via Google OAuth.
              </li>
              <li>
                Channel Overview: Display of key channel metrics such as
                subscriber count, total views, and video statistics.
              </li>
              <li>
                Keyword Research: A tool to discover relevant YouTube tags and
                keywords using the YouTube API.
              </li>
              <li>
                Video Upload: A feature to upload videos directly to the user's
                YouTube channel, complete with title, description, and tags.
              </li>
            </ul>
            <p>
              <strong>Limitations:</strong>
              <br />
              The service relies on the YouTube API, and any changes or
              limitations imposed by YouTube may affect the tool's
              functionality.
              <br />
              The tool does not guarantee improved channel performance or video
              rankings.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold text-lg">
            3. Data Privacy
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            <p className="mb-4">
              <strong>Data Collection:</strong> Fozato Pvt Ltd collects user
              data, including but not limited to, personal information, YouTube
              channel statistics, and video content, primarily through Google
              OAuth and YouTube API.
            </p>
            <p className="mb-4">
              <strong>Data Usage:</strong> The collected data is used to provide
              and improve the service, including user authentication, channel
              analysis, keyword research, and video uploads.
            </p>
            <p className="mb-4">
              <strong>Data Sharing:</strong> Data is not shared with third
              parties except for service providers essential to the operation of
              the tool, such as cloud hosting services.
            </p>
            <p className="mb-4">
              <strong>Data Retention and Deletion:</strong> User data is
              retained as long as the user’s account is active or as required by
              law. Upon request, user data can be deleted in compliance with
              applicable laws.
            </p>
            <p>
              <strong>Data Security:</strong> Fozato Pvt Ltd employs
              industry-standard security measures, including encryption and
              firewalls, to protect user data.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-semibold text-lg">
            4. User Consent
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            <p className="mb-4">
              <strong>Consent for Data Collection:</strong> Users must provide
              explicit consent to the collection and use of their data as
              outlined in this document.
            </p>
            <p>
              <strong>Withdrawal of Consent:</strong> Users may withdraw their
              consent at any time, but this may limit their ability to use the
              service.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="font-semibold text-lg">
            5. Intellectual Property
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            <p className="mb-4">
              <strong>Ownership:</strong> Fozato Pvt Ltd retains ownership of
              all content, tools, and services provided. The user retains
              ownership of any content they upload through the tool.
            </p>
            <p>
              <strong>User-Generated Content:</strong> Users grant Fozato a
              license to use the content they upload for the purpose of
              providing the service.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="font-semibold text-lg">
            6. Disclaimer of Warranties
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            <p className="mb-4">
              <strong>Limitation of Liability:</strong> Fozato Pvt Ltd is not
              liable for any direct or indirect damages arising from the use of
              the tool.
            </p>
            <p>
              <strong>No Guarantee of Results:</strong> The tool is provided "as
              is," with no guarantees of improved performance or specific
              outcomes.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger className="font-semibold text-lg">
            7. Indemnification
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            <p>
              <strong>User Indemnification:</strong> Users agree to indemnify
              Fozato Pvt Ltd against any claims arising from their use of the
              tool, including any violation of these terms.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger className="font-semibold text-lg">
            8. Termination
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            <p>
              <strong>Termination Conditions:</strong> Fozato Pvt Ltd reserves
              the right to terminate the service if the user violates any terms
              or if the service is discontinued.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger className="font-semibold text-lg">
            9. Governing Law and Jurisdiction
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            <p>
              <strong>Applicable Law:</strong> These terms are governed by the
              laws of India. Any disputes will be resolved under the
              jurisdiction of Kochi, Kerala.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-10">
          <AccordionTrigger className="font-semibold text-lg">
            10. Changes to the Terms
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            <p>
              <strong>Communication of Changes:</strong> Users will be notified
              of any changes to the terms via email or through announcements on
              the tool’s interface.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-11">
          <AccordionTrigger className="font-semibold text-lg">
            11. Contact Information
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            <p>
              <strong>Contact:</strong> For any inquiries, users can contact
              Fozato Pvt Ltd at:
              <br />
              Address: WS_VO/639 1st floor, cc54, 2593-5, Bose Nagar, Elamkulam,
              Kochi, Kerala-682020, India
              <br />
              Email:{" "}
              <a
                href="mailto:support@fozato.com"
                className="text-blue-600 underline"
              >
                support@fozato.com
              </a>
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Toc;
