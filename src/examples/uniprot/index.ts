import './index.html';

import {RcsbFv3DUniprot} from "../../RcsbFv3D/RcsbFv3DUniprot";

document.addEventListener("DOMContentLoaded", function(event) {

    const panel3d = new RcsbFv3DUniprot({
        elementId:"pfv",
        config:{
            upAcc:"P01112"
        }
    });
    panel3d.render();

});

