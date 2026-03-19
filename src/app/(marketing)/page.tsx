import Link from 'next/link'
import { SolutionsSection } from './_components/SolutionsSection'
import { PricingSection } from './_components/PricingSection'
import { Footer } from './_components/Footer'
import { SmartCTA } from './_components/SmartCTA'
import ShapeGrid from '@/components/ShapeGrid'

export default function LandingPage() {
    return (

        <div className="flex flex-col min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <ShapeGrid
                    direction="down"
                    borderColor="#151122"
                    hoverFillColor="#6a58a9"
                    squareSize={21}
                    shape="square"
                    speed={1.23}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8 pointer-events-none">
                <div className="max-w-4xl space-y-8 pointer-events-auto">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-[var(--foreground)] font-[var(--font-heading)]">
                        Picoverse : Le page builder minimaliste pour votre présence en ligne.
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                        Déployez vos pages en quelques minutes... Prenez le contrôle de votre présence sans la complexité technique.
                    </p>

                    <div className="flex justify-center">
                        <SmartCTA variant="hero" />
                    </div>

                    <div className="mt-16 relative w-full aspect-video rounded-[var(--radius)] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xl">
                        <img
                            src="https://qchiljvhlaltvhxncmlx.supabase.co/storage/v1/object/public/assets/homepic.png"
                            alt="Aperçu de Picoverse"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="relative z-10 pointer-events-auto">
                <SolutionsSection />
                <PricingSection />
                <Footer />
            </div>
        </div>
    )
}
