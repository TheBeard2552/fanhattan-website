import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Bagged Up',
  description: 'Terms of Service for Bagged Up. By accessing our app, you agree to be bound by these terms.',
};

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: February 2025
          </p>

          <article className="prose prose-invert prose-lg max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                1. Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing our app, Bagged Up, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing Bagged Up. The materials contained in Bagged Up are protected by applicable copyright and trademark law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                2. Use License
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of Bagged Up per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                <li>attempt to decompile or reverse engineer any software contained in Bagged Up;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by Bagged Up Studios, Inc. at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                3. Disclaimer
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials within Bagged Up are provided on an &apos;as is&apos; basis. Bagged Up Studios, Inc. makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Further, Bagged Up Studios, Inc. does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to Bagged Up.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                4. Limitations
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Bagged Up Studios, Inc. or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Bagged Up, even if Bagged Up Studios, Inc. or a Bagged Up Studios, Inc. authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                5. Accuracy of Materials
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing in Bagged Up could include technical, typographical, or photographic errors. Bagged Up Studios, Inc. does not warrant that any of the materials on Bagged Up are accurate, complete or current. Bagged Up Studios, Inc. may make changes to the materials contained in Bagged Up at any time without notice. However Bagged Up Studios, Inc. does not make any commitment to update the materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                6. Links
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bagged Up Studios, Inc. has not reviewed all of the sites linked to its app and is not responsible for the contents of any such linked sites. The inclusion of any link does not imply endorsement by Bagged Up Studios, Inc. of the site. Use of any such linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                7. Modifications
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bagged Up Studios, Inc. may revise these terms of service for its app at any time without notice. By using Bagged Up you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                8. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of Delaware, United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                9. Paid Services and Payment Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                There are no fees for the use of many aspects of the Services. However, some services, features, and products may be available for purchase (&quot;Paid Services&quot;). In addition to these Terms, the Bagged Up Premium &amp; Virtual Goods Agreement also applies to Paid Services. By purchasing or using Paid Services, you further agree to the Premium and Virtual Goods Agreement.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                &quot;Virtual Items&quot; includes but not limited to virtual currency, game items, avatar items, subscriptions, etc. included in Bagged Up.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                9.1 Overview
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                While there are no fees for the use of many aspects of the Services, Bagged Up charges fees in connection with Paid Services. These include certain subscription memberships (&quot;subscriptions&quot;) and certain virtual avatars, goods, currencies, or items (collectively, &quot;Virtual Goods&quot;) made available through the Services under this Agreement.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                9.2 Payment Information
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may submit your debit card, credit card, or other payment information (your &quot;Payment Information&quot;) via our Services to purchase Paid Services. Bagged Up accepts certain payment methods that may vary by country or Paid Services. We use third-party payment processors (for example, Apple, Google, Stripe, PayPal, etc.) to process your Payment Information (our &quot;Payment Partners&quot;).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you submit your Payment Information, you agree that:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Your Payment Information is true and correct;</li>
                <li>You are authorized to use your Payment Information;</li>
                <li>You will pay for the Paid Services (including any applicable taxes, fees, and costs) by the payment due date;</li>
                <li>You give us and our Payment Partners permission to charge you for the Paid Services, using your Payment Information, when payment is due for the full amount of the purchase (including any applicable taxes, fees, and costs);</li>
                <li>We may retain and share your Payment Information with our Payment Partners in order to process your purchase of Paid Services; and</li>
                <li>We may retain and use your Payment Information (including any information about you and your Payment Information provided to us by our Payment Partners) to provide you with notices and disclosures relating to renewals, recurring charges, and changes affecting your purchase.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                If you purchase any Paid Services via our Payment Partners, then that purchase may be further subject to the legal terms and privacy policies of the applicable Payment Partners. For purchases via our Payment Partners, your billing relationship will be directly with the applicable Payment Partner. Any fees charged for Paid Services will be billed by the applicable Payment Partner using the payment method you have provided that Payment Partner.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                9.3 Changes to Fees
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Bagged Up may change the fees or benefits associated with Paid Services from time to time with reasonable advance notice of material changes. However, no advance notice will be required for temporary promotions, including temporary reductions in the fees associated with the Paid Services.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                9.4 Third-Party Paid Services
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                You may be allowed to purchase subscriptions or other Virtual Goods from third-party sellers through the Services (&quot;Third-Party Paid Services&quot;). Bagged Up acts as payment collection agent for each seller of Third-Party Paid Services when accepting payments from you on behalf of the seller. However, sellers of Third-Party Paid Services are responsible for describing and providing the applicable Third-Party Paid Services. Bagged Up does not control the quality of Third-Party Paid Services and cannot guarantee the identity of the seller providing them or the validity of any claims they make.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                9.5 Discounts and Gifts
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bagged Up may offer discounts on Paid Services and the specific terms of each discount will be stated at the time the discount is offered. For example, if you are taking part in any trial period offer that enables you to use a subscription without charge, and that trial period converts into a paid subscription upon expiration of the trial period, then you must cancel the subscription prior to the end of the trial period in order to avoid incurring charges for the paid subscription.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Bagged Up users may be able to buy and gift certain Virtual Goods to other Bagged Up users through the Services. You will not be charged fees to access or utilize a gift, but you may be required to provide your Payment Information in order to redeem or use certain gifts.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                9.6 Refund Policy
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have immediate access to, and use of, Paid Services you buy through the Services. As a result, all purchases are final, non-refundable, and non-returnable to the furthest extent permitted by law. We do not have an obligation to refund or credit for partially used billing periods.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you reside in the EEA, United Kingdom, or Switzerland, you have the right to withdraw from this Agreement within 14 calendar days without giving reasons. The withdrawal period is 14 calendar days from the date of conclusion of this Agreement. To exercise your right of withdrawal, you must submit a request to Bagged Up.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Please note, however, that your right of withdrawal is lost when you purchase Paid Services that include: (a) a license to use Virtual Goods; or (b) a subscription. These Paid Services are provided to you once the Virtual Good is credited to your Account or upon commencement of the subscription, and you request and consent to these Paid Services being provided to you in this manner immediately upon purchasing them.
              </p>

              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                9.7 Taxes and Fees
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Bagged Up will charge applicable taxes and fees when required to do so, but it is your responsibility to pay for all applicable taxes and fees associated with your use of the Services and your access to and purchase and use of Paid Services, including transaction taxes, data plan fees, internet fees, and other similar costs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                10. Virtual Goods
              </h2>
              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                10.1 Bagged Up Avatars
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bagged Up Avatars are virtual avatars that you can customize, claim, and otherwise use through the Services and are a type of Virtual Good (&quot;Avatars&quot;). Your Avatar is displayed on your Account&apos;s profile page and as your Avatar throughout the Services (e.g., on posts, comments, and chats).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Each Avatar has specific and unique gear, accessories, outfits, hairstyles, background cards, and/or other art (&quot;Avatar Art&quot;) associated with it. The Avatar Art is licensed, not sold. Bagged Up and our licensors reserve all rights in and to the Avatar Art not expressly provided for in this Agreement.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Subject to your continued compliance with this Agreement and the User Agreement, Bagged Up grants you a non-transferable, non-exclusive, revocable, limited license to use and display all or part of the Avatar Art associated with your Avatar and to mix-and-match that Avatar Art with other Avatar Art made available by Bagged Up and its licensors through the Services, in each case, for your own personal, non-commercial use, solely within the Services and in connection with your Account through which you set your Avatar (the &quot;Limited Licensed Rights&quot;). You will lose the Limited License Rights if you breach this Agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                11. Account Suspension or Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                As stated in the User Agreement you must follow and comply with the rules for our Services and the rules of the individual communities you participate in. Failure to do so may constitute a breach of this Agreement and result in a temporary or permanent ban from the Services or certain communities or the removal of your posts and comments, including those communities where you might have access to aspects of or benefits from Paid Services. In such instances, you might lose the benefits of Paid Services, and we will not compensate you for this loss.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                12. Your Acknowledgements
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In connection with your access, purchase, or use of any subscription, Virtual Good, or other Paid Services made available through the Services (collectively, &quot;Bagged Up Econ Goods&quot;) — you represent, warrant, acknowledge, and agree that:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong className="text-foreground">You&apos;ll comply with Bagged Up and community rules</strong> — You will follow and comply with our rules for the Services stated in our User Agreement, and this Agreement and with the rules of the individual communities you participate in;</li>
                <li><strong className="text-foreground">Bagged Up Econ Goods are not money or legal tender</strong> — No Bagged Up Econ Good is money or legal tender, nor does it have a monetary value or cash equivalent, nor is it a cash or deposit account or redeemable for any sum of real world money, monetary value, or any other goods or services outside of the Services without Bagged Up&apos;s approval, nor does it constitute a currency or property of any type;</li>
                <li><strong className="text-foreground">You can&apos;t transfer or sell most Bagged Up Econ Goods</strong> — With limited exceptions expressly set forth in this Agreement, your Bagged Up Econ Goods (including your Limited Licensed Rights) cannot be sold, traded, bartered, transferred, exchanged, offered for sale, or otherwise used outside of the Services or your Account without our permission;</li>
                <li><strong className="text-foreground">Your rights to Bagged Up Econ Goods are limited</strong> — With limited exceptions expressly set forth in this Agreement, you do not own or have any property, proprietary, intellectual property, ownership, or monetary right, title, or other proprietary interest in Bagged Up Econ Goods regardless of any consideration offered or paid in exchange for them, but, instead, are provided a license to access and use Bagged Up Econ Goods under this Agreement;</li>
                <li><strong className="text-foreground">You won&apos;t commercialize any Bagged Up Econ Good</strong> — Without our permission and, as applicable, permission from any Third-Party Rights holder, you will not license, sublicense, sell, resell, transfer, assign, distribute, or otherwise commercially exploit or make available to any third party (as a trademark or brand or as a derivative work) any Bagged Up Econ Good (including any Virtual Good Art), will not register or attempt to register any trademark, copyright, or other intellectual property rights in any Bagged Up Econ Good, will not market or sell any Bagged Up Econ Good, nor use any Bagged Up Econ Good to market or sell your goods or services or any other third party&apos;s goods or services, nor remove, delete, alter, or obscure any trademarks, specifications, warranties, or disclaimers, or any intellectual property or proprietary notices from Bagged Up or any Third-Party Rights holders, and will not state or imply that you are endorsed by or affiliated with Bagged Up in any way, including by using Bagged Up&apos;s name, trademarks, or logos;</li>
                <li><strong className="text-foreground">You won&apos;t bypass any limits or security measures set by Bagged Up</strong> — You will not disrupt, interfere with, violate the security of, or attempt to gain unauthorized access to Bagged Up Econ Goods or any other element of Paid Services (including by using any device, software, or routine), nor will you acquire or dispose of any Bagged Up Econ Good in violation of any claim, purchase, eligibility, transfer, rate, exchange, security, or other limit set by us or otherwise in violation of this Agreement without our permission (including through any manner that could damage, destroy, disrupt, disable, impair, overburden, or otherwise impede or harm in any manner our Services), nor will you bypass, breach, avoid, remove, deactivate, impair, descramble, or otherwise circumvent any security device, protection, or technological measure implemented to protect the Services and Bagged Up Econ Goods, and you understand that Bagged Up sets these limits and terms in order to make the Services enjoyable for Bagged Up users and deter bots, robots, parser, spiders, scripts, programs, routines, spam, and other forms of automation, as well as fraud, illegal activity, and other violations of this Agreement;</li>
                <li><strong className="text-foreground">You won&apos;t extract data from Bagged Up Econ Goods or the Services</strong> — Without our permission, you will not extract, copy, duplicate, download, cache, publish, transmit, or otherwise reproduce, transfer, distribute, store, disseminate, aggregate, or otherwise use (in whole or in part) any data, text, reports, or other Materials from or relating to Bagged Up Econ Goods or Services (including through web scraping, web harvesting, or other data extraction methods);</li>
                <li><strong className="text-foreground">You&apos;ll comply with the law and use common sense</strong> — You will not use or attempt to use the Services to acquire or dispose of any Bagged Up Econ Goods that were fraudulently obtained, stolen, taken without authorization, or otherwise illegally obtained, will not use any Bagged Up Econ Good, whether within or outside of the Services, for any illegal purpose (including market manipulation, money laundering, fraud, or any other crime), for any kind of wagering, betting, or gambling, or in connection with any transactions involving goods or services that are prohibited under Bagged Up&apos;s policy against transactions involving prohibited goods or services, and will comply with applicable laws, including tax obligations, arising from your acquisition or disposition of any Bagged Up Econ Good; and</li>
                <li><strong className="text-foreground">You won&apos;t encourage anyone else to violate this Agreement</strong> — You will not cause or attempt to cause any third party to violate any of the representations, warranties, acknowledgements, and agreements set forth above or otherwise in this Agreement.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Failure to follow and comply with the above rules may constitute a breach of this Agreement and result in a temporary or permanent ban from Bagged Up or certain communities or removal of your access to Bagged Up Econ Goods. In such instances, you might lose the benefits of Bagged Up Econ Goods, and we will not compensate you for this loss.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                13. You Assume These Risks
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In connection with your access to and purchase and use of any Bagged Up Econ Good, you acknowledge and assume, and will hold Bagged Up harmless from liability resulting or arising from, the following risks:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong className="text-foreground">Losing access to your Account</strong> — Without making a refund to or otherwise compensating you for any purported loss, Bagged Up may restrict, disable, or otherwise change the Services or suspend and/or terminate your Account if we suspect you will violate or have violated this Agreement (including, for example, using any Bagged Up Econ Good, whether within or outside of the Services, for any illegal purpose), and if your Account is suspended or terminated, you may lose or be unable to use, either temporarily or permanently, your Bagged Up Econ Goods on the Services;</li>
                <li><strong className="text-foreground">Problems with Bagged Up users</strong> — Bagged Up only facilitates sales of Third-Party Paid Services and otherwise does not operate a marketplace nor facilitate any transactions between you and Bagged Up users or third parties for Bagged Up Econ Goods or any other goods or services, and Bagged Up makes no promises or guarantees relating to, and is not responsible for, any transactions between you and Bagged Up users or third parties (including any disputes relating to the transactions), nor for confirming the identity of your counterparty, the reason for your transaction, nor your satisfaction or the counterparty&apos;s satisfaction with the transaction (you engage in these transactions solely at your own risk);</li>
                <li><strong className="text-foreground">Problems with marketplaces</strong> — Bagged Up does not recognize or take responsibility for any third-party marketplaces or services that allow third parties to sell, transfer, or otherwise use Bagged Up Econ Goods, and any unauthorized use of such marketplaces or services by you is a violation of this Agreement; and</li>
                <li><strong className="text-foreground">Changes to Bagged Up Econ Goods</strong> — Without making a refund to or otherwise compensating you for any purported loss, Bagged Up may change Bagged Up Econ Goods at our discretion and those changes may make some or all Bagged Up Econ Goods more or less common, desirable, effective, or functional, even though such changes may affect the value or utility of the Bagged Up Econ Good, or the ability to obtain certain Bagged Up Econ Goods (for example, the number of Bagged Up Econ Goods required to use others may be increased or decreased and restrictions on any Bagged Up Econ Good redemption may be imposed at any time), Bagged Up does not guarantee that Bagged Up Econ Goods will continually be offered for any particular length of time and reserves the right to control, regulate, modify, suspend, remove, terminate, stop providing, or discontinue support for any Bagged Up Econ Goods for any or no reason, in our sole discretion, and without advance notice or liability to you to the fullest extent permitted by law, and you understand that, in accumulating any Bagged Up Econ Goods, you may not rely upon their continued availability on the Services or any retainment of or future appreciation in their quality or value.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You understand that your assumption of the above risks is a condition of your access to and use and purchase of Bagged Up Econ Goods. If you do not agree to assume these risks, then you do not have our permission to access, purchase, or use any Bagged Up Econ Good.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                14. Your Content
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Services may contain information, text, links, graphics, photos, videos, audio, streams, software, tools, or other materials (&quot;Content&quot;), including Content created with or submitted to the Services by you or through your Account (&quot;Your Content&quot;). We take no responsibility for and we do not expressly or implicitly endorse, support, or guarantee the completeness, truthfulness, accuracy, or reliability of any of Your Content.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By submitting Your Content to the Services, you represent and warrant that you have all rights, power, and authority necessary to grant the rights to Your Content contained within these Terms. Because you alone are responsible for Your Content, you may expose yourself to liability if you post or share Content without all necessary rights.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You retain any ownership rights you have in Your Content, but you grant Bagged Up the following license to use that Content:
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When Your Content is created with or submitted to the Services, you grant us a worldwide, royalty-free, perpetual, irrevocable, non-exclusive, transferable, and sublicensable license to use, copy, modify, adapt, prepare derivative works of, distribute, store, perform, and display Your Content and any name, username, voice, or likeness provided in connection with Your Content in all media formats and channels now known or later developed anywhere in the world. This license includes the right for us to make Your Content available for syndication, broadcast, distribution, or publication by other companies, organizations, or individuals who partner with Bagged Up. You also agree that we may remove metadata associated with Your Content, and you irrevocably waive any claims and assertions of moral rights or attribution with respect to Your Content.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Any ideas, suggestions, and feedback about Bagged Up or our Services that you provide to us are entirely voluntary, and you agree that Bagged Up may use such ideas, suggestions, and feedback without compensation or obligation to you.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Although we have no obligation to screen, edit, or monitor Your Content, we may, in our sole discretion, delete or remove Your Content at any time and for any reason, including for violating these Terms, violating our Content Policy, or if you otherwise create or are likely to create liability for us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                15. Third-Party Service
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bagged Up Studios, Inc may permit certain third party applications (like leaderboards, game networks) to provide content through the App (&quot;Third Party Services&quot;). The App may be used to send content provided by the Third Party Service between users who have the Third Party Service installed on their device. When you do so, Bagged Up Studios, Inc will share information with the Third Party Service as described in the Bagged Up Studios, Inc Privacy Policy. Bagged Up Studios, Inc is not responsible for and does not control Third Party Services. Bagged Up Studios, Inc provides these Third Party Services only as a convenience to you. Bagged Up Studios, Inc has no obligation to review or monitor, and does not approve, endorse, or make any representations or warranties with respect to Third Party Services. You use all Third Party Services at your own risk. When you access a Third Party Service, the applicable third party&apos;s terms and policies apply, including the third party&apos;s privacy policies. You should make whatever investigation you feel necessary or appropriate before proceeding with any transaction in connection with any Third Party Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                16. Release
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You hereby irrevocably and unconditionally release and forever discharge Bagged Up Studios, Inc (and its suppliers) from any and all claims, demands, and rights of action, whether now known or unknown, which relates to any interactions with, or act or omission of, any Third Party Service, other Apps users, or Third Party Advertisers. IF YOU ARE A CALIFORNIA RESIDENT, YOU HEREBY WAIVE CALIFORNIA CIVIL CODE SECTION 1542 IN CONNECTION WITH THE FOREGOING, WHICH STATES: &quot;A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR HER MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR.&quot;
              </p>
              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                16.1
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                APPS ARE PROVIDED &quot;AS-IS&quot; AND AS AVAILABLE AND Bagged Up Studios, Inc (AND ITS SUPPLIERS) EXPRESSLY DISCLAIM ANY WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING THE WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, OR NON-INFRINGEMENT. Bagged Up Studios, Inc (AND ITS SUPPLIERS) MAKE NO WARRANTY THAT ANY APP: (A) WILL MEET YOUR REQUIREMENTS; (B) WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE BASIS; OR (C) WILL BE ACCURATE, RELIABLE, COMPLETE, LEGAL, OR SAFE.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU.
              </p>
              <h3 className="text-xl font-display uppercase tracking-wide text-foreground mt-6 mb-3">
                16.2 Limitation on Liability
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                IN NO EVENT SHALL Bagged Up Studios, Inc (OR ITS SUPPLIERS) BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFIT OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES ARISING FROM OR RELATING TO THIS AGREEMENT OR Bagged Up Studios, Inc&apos;S PRIVACY PRACTICES, ANY APP, EVEN IF Bagged Up Studios, Inc HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO, AND USE OF, ANY APP ARE AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE DEVICE OR LOSS OF DATA RESULTING THEREFROM. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, Bagged Up Studios, Inc&apos;S LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM OR RELATED TO THIS AGREEMENT OR Bagged Up Studios, Inc&apos;S PRIVACY PRACTICES (FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION), WILL AT ALL TIMES BE LIMITED TO THE AMOUNT YOU&apos;VE PAID Bagged Up Studios, Inc IN THE PRIOR 12 MONTHS (IF ANY). IN NO EVENT SHALL Bagged Up Studios, Inc&apos;S SUPPLIERS HAVE ANY LIABILITY ARISING OUT OF OR IN ANY WAY CONNECTED TO THIS AGREEMENT.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU AND YOU MAY ALSO HAVE OTHER LEGAL RIGHTS THAT VARY FROM JURISDICTION TO JURISDICTION.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                17. Prizing
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bagged Up Studios, Inc. reserves the right to void any prizing or rewards if fraudulent activity is associated with an account including: refunding an IAP that resulted in a prize, creating alt accounts to rig winnings in your favor, and any activity associated with taking advantage of a mechanic within Bagged Up to abuse and commit fraudulent activity with the aim of benefiting the user or a users associates. Bagged Up Studios, Inc. reserves the right to pursue legal action against users associated with fraudulent activity for personal benefit.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If an invalid refund is requested and granted on an In-App Purchase associated with Bagged Up Studios, Inc. and its subsidiaries, Bagged Up Studios, Inc. reserves the right to ban accounts and devices of the offending parties and may take further punitive action depending on the severity of the offence. Invalid refunds, meaning any refund in which a user received the proper reward but refunded anyways, are void and the reward will not be given to the user.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bagged Up reserves the right to void prizing and rewards associated with a technical issue or bug within the product. Users who leverage a technical issue or bug for their own personal benefit will have all account activity suspended and all prizing and rewards rendered void.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All prizing for in-app contests is sponsored exclusively by Bagged Up Studios, Inc.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The Bagged Up app and website are not sponsored by, endorsed by, or affiliated with any professional sports team or league. Bagged Up uses virtual currency and is intended for entertainment purposes only. No purchase is necessary to participate. Bagged Up is aimed towards a mature audience (18+).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                18. Consent to Share Consumption Data with Apple
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By using our app and making in-app purchases, you consent to our sharing of data regarding your usage and consumption of purchased content with Apple, as part of our efforts to resolve refund requests. This information may include details about how you have accessed and interacted with the purchased content. The purpose of sharing this data is to help Apple make an informed decision regarding refund requests. We ensure that such data sharing is done in compliance with Apple&apos;s policies and only as necessary to process your requests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4">
                19. Virtual Currency for Exclusive Use Inside This Application
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                On this Application certain payments may be made using a Virtual Currency. Unless otherwise stated, such Virtual Currency is not tradable, exchangeable or redeemable against any traditional currency, any other open digital currency, goods or any other values.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By purchasing Virtual Currency, Users acknowledge and understand that it may only be used within this Application for the purposes expressly authorized by the Owner within the framework of its Services. Users also acknowledge and agree that they may not transfer, purchase, sell, or exchange such Virtual Currency outside of the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Accordingly, Users may not sublicense, trade, sell or attempt to sell Virtual Currency for money, or exchange Virtual Currency for value of any kind outside of the dedicated offering provided by the Owner through this Application. Any such prohibited use or transaction shall be considered null and void and could result in legal action being taken against the User.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In case of contract or account termination for any cause attributable to the User, any and all unused Virtual Currency shall be forfeited and no refund shall be granted.
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
