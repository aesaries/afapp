// src/components/LayoutGeneral.jsx
import { Cabezal } from "./Cabezal";
import { Pie } from "./Pie";

const LayoutGeneral = ({ children }) => {
    return (
        <>
            <Cabezal />
            <main>{children}</main>
            <Pie />
        </>
    );
};

export default LayoutGeneral;
