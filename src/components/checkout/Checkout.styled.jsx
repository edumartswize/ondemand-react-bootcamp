import styled from "@emotion/styled";

export const CheckoutList= styled.div`
    th {
        width: 10%;
        padding: 5px;
    }

    .button-chk {
        //display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
        border-radius: 6px;
        border: none;
        margin: 10px;

        color: #fff;
        background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
        background-origin: border-box;
        box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    .button-chk:focus {
        box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
        outline: 0;
    }

    .total {
        font-weight: bold;
    }
`;

export const CheckoutForm= styled.form`
    text-align: left;

    * {
        margin-top: 0.5em;
    }

    label {
        float: left;
        width: 10%;
        text-align: right;
        margin-right: 0.5em;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
    }

    input, textarea {
        width: 30%;
        padding-left: 0.5em;
    }
`;