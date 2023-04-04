import Main from "@/layouts/main";
import Menu from "../components/menu";
import Section from "../components/section";


export default function Home() {
    return (
        <Main>
            <Menu active={1} />
            <Section>
                s
            </Section>
        </Main>
    )
}
