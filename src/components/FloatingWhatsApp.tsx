import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingWhatsApp = () => {
    const handleWhatsApp = () => {
        window.open(
            "https://wa.me/6282241598077?text=Halo%20WednesDev,%20saya%20ingin%20konsultasi%20tentang%20sistem%20teknologi",
            "_blank"
        );
    };

    return (
        <Button
            onClick={handleWhatsApp}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA59] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group animate-bounce-slow"
            size="icon"
            aria-label="Chat WhatsApp"
        >
            <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Chat via WhatsApp
            </span>
        </Button>
    );
};

export default FloatingWhatsApp;
