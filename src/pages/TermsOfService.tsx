import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background">
            <SEO title="Terms of Service" description="Terms of Service for WednesDev" />
            <Navigation />
            <main className="pt-24 pb-16 container-custom max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing our website at https://wednesdev.id, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                    </p>
                    <h2>2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on WednesDev's website for personal, non-commercial transitory viewing only.
                    </p>
                    <h2>3. Disclaimer</h2>
                    <p>
                        The materials on WednesDev's website are provided on an 'as is' basis. WednesDev makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                    <h2>4. Limitations</h2>
                    <p>
                        In no event shall WednesDev or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WednesDev's website.
                    </p>
                    <h2>5. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of Indonesia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                    <h2>Contact Us</h2>
                    <p>If you have any questions about these Terms, You can contact us:</p>
                    <ul>
                        <li>By email: wednesdev.id@gmail.com</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
