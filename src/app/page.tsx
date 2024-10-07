'use client';

import ButtonContained from "@/components/layouts/buttons/ButtonContained";
import LogoIPM from "@/components/layouts/LogoIPM";
import Page from "@/components/layouts/Page";
import ThemeSelector from "@/components/layouts/ThemeSelector";
import ContextTheme, { ThemeProvider } from "@/data/context/ContextTheme";
import { IconListCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Home() {

    const router = useRouter();

    return (
        <ThemeProvider>
            
            <Page
            >
                <LogoIPM />
                <h1 className="text-4xl font-bold text-center">
                    Bem-vindo ao <span className="text-primary">App de Tarefas</span>
                </h1>
                <ButtonContained
                    color="primary"
                    icon={<IconListCheck size={24} />}
                    text="Ir para a página de tarefas"
                    onClick={() => router.push('/todos')}

                />
            </Page>
        </ThemeProvider>
    );
}
