import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
   --capri: #bfe0d4;
   --capri-dark: #a3dfca;
   --yellow-transparent: #e3d99e;
   --tinkerbell: #bacd98;
   --basilica: #6a7a4c;

}
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Roboto',sans-serif;
        
        button {
            cursor: pointer;
            background: var(--capri);
            border: none;
            border-radius: 10px;
            box-shadow: 2px 2px 2px;
            margin: 5px;
            font-size: 14px;
            font-weight: 600;

            height: 50px;
            min-height: 50px;
            width: 200px;
           :hover{
                opacity: 100%;
           }
           :active {
               background: var(--capri-dark);
           }
           
        }

        h1 {
            color: black
        }
    }


`;
