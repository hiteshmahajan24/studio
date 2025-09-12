import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BrainCircuit } from "lucide-react";

export function WellnessNook() {
    const wellnessImage = PlaceHolderImages.find((img) => img.id === "wellness-bg");

    return (
        <Card className="relative overflow-hidden">
            {wellnessImage && (
                 <Image
                    src={wellnessImage.imageUrl}
                    alt={wellnessImage.description}
                    data-ai-hint={wellnessImage.imageHint}
                    fill
                    className="object-cover object-center"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <CardContent className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
                <BrainCircuit className="h-8 w-8 mb-2" />
                <h3 className="text-lg font-semibold">Mind Refresher</h3>
                <p className="text-sm text-white/80">
                    Feeling stressed? Take a 5-minute break for a guided breathing exercise.
                </p>
            </CardContent>
        </Card>
    );
}
