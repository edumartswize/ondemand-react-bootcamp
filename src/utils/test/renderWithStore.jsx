import { render } from "@testing-library/react";
import { store } from "../../state/store";
import { Provider } from "react-redux";

function renderWithStore(element){
    render(
        <Provider store={store}>
            {element}
        </Provider>
    );

    return { store };
}

export default renderWithStore;