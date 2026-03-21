import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ContactNotificationEmailProps {
    name: string;
    email: string;
    message: string;
}

export const ContactNotificationEmail = ({
    name,
    email,
    message,
}: ContactNotificationEmailProps) => (
    <Html>
        <Head />
        <Preview>Contact notification</Preview>
        <Tailwind>
            <Body className="bg-[#f6f9fc] my-auto mx-auto font-sans">
                <Container className="bg-white border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[40px] w-[465px] shadow-sm">
                    <Section className="mt-[32px]">
                        <Img
                            src={`https://qchiljvhlaltvhxncmlx.supabase.co/storage/v1/object/public/assets/mono_gradient_light.svg`}
                            width="60"
                            alt="Picoverse"
                            className="mx-auto block"
                        />
                        <Heading className="text-black text-[24px] font-bold text-center p-0 my-[30px] mx-0 uppercase tracking-tighter">
                            PICOVERSE
                        </Heading>
                    </Section>
                    <Heading className="text-black text-[20px] font-bold text-center p-0 my-[30px] mx-0">
                        Nouveau message de Picoverse
                    </Heading>
                    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                    <Text className="text-black text-[14px] leading-[24px]">
                        <strong>Nom :</strong> {name}
                    </Text>
                    <Text className="text-black text-[14px] leading-[24px]">
                        <strong>Email :</strong> {email}
                    </Text>
                    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                    <Text className="text-black text-[14px] leading-[24px] font-bold pb-2">
                        Message :
                    </Text>
                    <Text className="text-black text-[14px] leading-[24px] bg-[#f9fafb] p-[16px] rounded-md italic">
                        {message}
                    </Text>
                    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                    <Text className="text-[#666666] text-[12px] leading-[24px]">
                        Ceci est une notification automatique générée par le formulaire de contact Picoverse.
                        Picoverse Inc. • Rouen, Normandie 🇫🇷
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default ContactNotificationEmail;
