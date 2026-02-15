import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Bagged Up',
  description: 'Privacy Policy for Bagged Up. Learn how we collect, use, disclose, and safeguard your information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-platform transition-colors mb-8"
          >
            ← Back to home
          </Link>

          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-12">
            Effective Date: April 4, 2025
          </p>

          <article className="prose prose-invert prose-lg max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bagged Up Studios, Inc. (&quot;we&quot;, &quot;our&quot;) values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile app and related services. By accessing or using our app, you consent to the practices described in this policy. If you do not agree with our policies, please do not use the app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                1. Information We Collect
              </h2>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Log Data
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you access our servers via Bagged Up, we may automatically log the standard usage data provided by your device. This data may include your device&apos;s Internet Protocol (IP) address, your device type and version, your activity within the app, time and date, and other details.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Additionally, when you encounter certain errors while using the app, we automatically collect data about the error and the circumstances surrounding its occurrence. This data may include technical details about your device, what you were trying to do when the error happened, and other technical information that may have contributed to the problem.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Device Data
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our app may also access and collect data via your device&apos;s in-built tools, such as:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Your identity</li>
                <li>Location data</li>
                <li>Contacts</li>
                <li>Phone/SMS</li>
                <li>Storage, photos and/or media</li>
                <li>Notifications</li>
                <li>Background data refresh</li>
                <li>Mobile data</li>
                <li>Device/app history</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                What we collect can depend on the individual settings of your device and the permissions you grant when you install and use the app.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Personal Information
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may ask for personal information, such as your:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Name</li>
                <li>Email</li>
                <li>Social media profiles</li>
                <li>Date of birth</li>
                <li>Phone/mobile number</li>
                <li>Payment information</li>
              </ul>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Business Data
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Business data refers to data that accumulates over the normal course of operation on our platform. This may include transaction records, stored files, user profiles, analytics data and other metrics, as well as other types of information, created or generated, as users interact with our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                2. Legal Bases for Processing
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We will process your personal information lawfully, fairly and in a transparent manner. We collect and process information about you only where we have legal bases for doing so.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These legal bases depend on the services you use and how you use them, meaning we collect and use your information only where:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>it&apos;s necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract (for example, when we provide a service you request from us);</li>
                <li>it satisfies a legitimate interest (which is not overridden by your data protection interests), such as for research and development, to market and promote our services, and to protect our legal rights and interests;</li>
                <li>you give us consent to do so for a specific purpose (for example, you might consent to us sending you our newsletter); or</li>
                <li>we need to process your data to comply with a legal obligation.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Where you consent to our use of information about you for a specific purpose, you have the right to change your mind at any time (but this will not affect any processing that has already taken place).
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We don&apos;t keep personal information for longer than is necessary. While we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification. That said, we advise that no method of electronic transmission or storage is 100% secure and cannot guarantee absolute data security. If necessary, we may retain your personal information for our compliance with a legal obligation or in order to protect your vital interests or the vital interests of another natural person.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                3. Collection and Use of Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect, hold, use and disclose information for the following purposes and personal information will not be further processed in a manner that is incompatible with these purposes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>for technical assessment, including to operate and improve our app, associated applications and associated social media platforms;</li>
                <li>to provide you with our app and platform&apos;s core features;</li>
                <li>to process any transactional or ongoing payments;</li>
                <li>to enable you to access and use our app, associated platforms and associated social media channels;</li>
                <li>to contact and communicate with you;</li>
                <li>for internal record keeping and administrative purposes;</li>
                <li>for analytics, market research and business development, including to operate and improve our app, associated applications and associated social media platforms;</li>
                <li>to run competitions and/or offer additional benefits to you;</li>
                <li>for advertising and marketing, including to send you promotional information about our products and services and information about third parties that we consider may be of interest to you; and</li>
                <li>to comply with our legal obligations and resolve any disputes that we may have.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                4. Disclosure of Personal Information to Third Parties
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may disclose personal information to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>third party service providers for the purpose of enabling them to provide their services, including (without limitation) IT service providers, data storage, hosting and server providers, ad networks, analytics, error loggers, debt collectors, maintenance or problem-solving providers, marketing or advertising providers, professional advisors and payment systems operators;</li>
                <li>our employees, contractors and/or related entities;</li>
                <li>sponsors or promoters of any competition we run;</li>
                <li>credit reporting agencies, courts, tribunals and regulatory authorities, in the event you fail to pay for goods or services we have provided to you;</li>
                <li>courts, tribunals, regulatory authorities and law enforcement officers, as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise or defend our legal rights;</li>
                <li>third parties, including agents or sub-contractors, who assist us in providing information, products, services or direct marketing to you; and</li>
                <li>third parties to collect and process data.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                5. International Transfers of Personal Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The personal information we collect is stored and processed in United States, or where we or our partners, affiliates and third-party providers maintain facilities. By providing us with your personal information, you consent to the disclosure to these overseas third parties.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We will ensure that any transfer of personal information from countries in the European Economic Area (EEA) to countries outside the EEA will be protected by appropriate safeguards, for example by using standard data protection clauses approved by the European Commission, or the use of binding corporate rules or other legally accepted means.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Where we transfer personal information from a non-EEA country to another country, you acknowledge that third parties in other jurisdictions may not be subject to similar data protection laws to the ones in our jurisdiction. There are risks if any such third party engages in any act or practice that would contravene the data privacy laws in our jurisdiction and this might mean that you will not be able to seek redress under our jurisdiction&apos;s privacy laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                6. Your Rights and Controlling Your Personal Information
              </h2>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Choice and consent
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By providing personal information to us, you consent to us collecting, holding, using and disclosing your personal information in accordance with this privacy policy. If you are under 16 years of age, you must have, and warrant to the extent permitted by law to us, that you have your parent or legal guardian&apos;s permission to access and use the app and they (your parents or guardian) have consented to you providing us with your personal information. You do not have to provide personal information to us, however, if you do not, it may affect your use of our app or the products and/or services offered on or through it.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Information from third parties
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person&apos;s consent to provide the personal information to us.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Restrict
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may choose to restrict the collection or use of your personal information. If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by contacting us using the details below. If you ask us to restrict or limit how we process your personal information, we will let you know how the restriction affects your use of our app or products and services.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Access and data portability
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may request details of the personal information that we hold about you. You may request a copy of the personal information we hold about you. Where possible, we will provide this information in CSV format or other easily readable machine format. You may request that we erase the personal information we hold about you at any time. You may also request that we transfer this personal information to another third party.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Correction
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant or misleading, please contact us using the details below. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading or out of date.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Notification of data breaches
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We will comply laws applicable to us in respect of any data breach.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Complaints
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                Unsubscribe
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To unsubscribe from our e-mail database or opt-out of communications (including marketing communications), please contact us using the details below or opt-out using the opt-out facilities provided in the communication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our privacy policy covers the use of cookies between your device and our servers.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A cookie is a small piece of data that an app may store on your device, typically containing a unique identifier that allows the app servers to recognise your device when you use the app; information about your account, session and/or device; additional data that serves the purpose of the cookie, and any self-maintenance information about the cookie itself.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies to give your device access to core features of our app, to track app usage and performance on your device, to tailor your experience of our app based on your preferences, and to serve advertising to your device. Any communication of cookie data between your device and our servers occurs within a secure environment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                8. Business Transfers
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If we or our assets are acquired, or in the unlikely event that we go out of business or enter bankruptcy, we would include data among the assets transferred to any parties who acquire us. You acknowledge that such transfers may occur, and that any parties who acquire us may continue to use your personal information according to this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                9. Limits of Our Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our app may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At our discretion, we may change our privacy policy to reflect current acceptable practices. We will take reasonable steps to let users know about changes via our app or app delivery service. Your continued use of our app after any changes to this policy will be regarded as acceptance of our practices around privacy and personal information.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If we make a significant change to this privacy policy, for example changing a lawful basis on which we process your personal information, we will ask you to re-consent to the amended privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                11. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Email: <a href="mailto:info@baggedupstudios.com" className="text-platform hover:underline">info@baggedupstudios.com</a>
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This policy is effective as of April 4, 2025.
              </p>
            </section>
          </article>

          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-platform transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
