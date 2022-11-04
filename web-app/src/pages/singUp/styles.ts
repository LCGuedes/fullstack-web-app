import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #756df4;
`;

export const Form = styled.form`
    display: grid;
    text-align: center;
    width: 370px;
    gap: 16px;
    color: #fff;

    h3 {
        font-size: 2rem;
        font-weight: 400;
        margin-bottom: 10px;
    };

    span {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    };

    
    button {
        padding: 14px;
        border-radius: 20px;
        font-size: 1rem;
        border: none;
        color: #fff;
        background: transparent;
        box-shadow: 0 0 3px  #f4f0ec;
        cursor: pointer;

        :hover{
            box-shadow: 0 0 6px  #f4f0ec;

        }; 
    };

    p {
        background: black;
        border-radius: 10px;
        padding: 10px;
        text-align: left;
    }

    .offscreen {
        display: none;
    };

    .valid {
        color: #adff2f;
    }

    .invalid {
        color: #ff0000;
    }

    .hide {
        display: none;
    }

`;

export const Input = styled.input`
    padding: 1rem;
    border: none;
    outline: none;
    background: transparent;
    box-shadow: 0 0 3px #f4f0ec;
    caret-color: #fff;
    color: #fff;
    
    ::placeholder {
        color: #fff;
    };
`;

export const CheckBox = styled.span``;


