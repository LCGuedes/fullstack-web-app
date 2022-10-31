import { createGlobalStyle } from "styled-components";
import SignUp from "./pages/singUp";

export default function App() {
    return (
        <>
            <GlobalStyles />
            <SignUp />
        </>   
    )
};

const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    };
`;