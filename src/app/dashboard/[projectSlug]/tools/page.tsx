import { QRCodeCard } from '@/components/dashboard/QRCodeCard'

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-pv-dark-100 pb-12">
            <header className="bg-pv-dark-0 text-white-0 border-b border-white/5">
                <div className="mx-auto max-w-7xl pl-16 pr-4 py-8 md:px-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="font-pv-inter font-pv-bold text-lg text-white-0 uppercase tracking-widest">
                                Outils
                            </h1>
                            <p className="mt-1 font-pv-inter font-pv-regular text-xs text-white-0/60 ">
                                Des utilitaires pour booster votre présence.
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* QR Code Tool Card */}
                    <QRCodeCard 
                        url="https://picoverse.se"
                        title="Générateur de QR Code"
                        description="Générez un QR code pour n'importe quel lien et téléchargez-le en haute qualité."
                        showInput={true}
                    />
                    
                    {/* Placeholder for future tools */}
                    <div className="bg-pv-dark-200/50 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center group">
                        <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-pv-brand-500/10 transition-colors">
                            <span className="text-white-0/20 text-xl font-pv-bold">?</span>
                        </div>
                        <h3 className="text-sm font-pv-bold text-white-0/40 uppercase tracking-widest mb-2">Prochain outil</h3>
                        <p className="text-xs text-white-0/20 font-pv-regular italic">Bientôt disponible...</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
