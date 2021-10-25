# rcsb-saguaro-3D

RCSB Saguaro Web 3D is an open-source library built on the top of the [RCSB Saguaro 1D Feature Viewer](https://rcsb.github.io/rcsb-saguaro)
and [RCSB Molstar](https://github.com/rcsb/rcsb-molstar) designed to display protein features at the [RCSB Web Site](https://www.rcsb.org). The package collects protein annotations from the 
[1D Coordinate Server](https://1d-coordinates.rcsb.org) and the main [RCSB Data API](https://data.rcsb.org) and generates Protein 
Feature Summaries. The package allows access to RCSB Saguaro and Molstar methods to add or change displayed data. 
<!---
<div id="pfv"></div>
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://cdn.jsdelivr.net/npm/@rcsb/rcsb-saguaro-3d@1.0.1-beta/build/dist/app.js"></script>
<script type="text/javascript">
var rowConfigChainA = [
    {
        trackId: "sequenceTrack",
        trackHeight: 20,
        trackColor: "#F9F9F9",
        displayType: "sequence" /* SEQUENCE */,
        nonEmptyDisplay: true,
        rowTitle: "CHAIN A",
        trackData: [
            {
                begin: 1,
                value: "CGVPAIQPVLSGLSRIVNGEEAVPGSWPWQVSLQDKTGFHFCGGSLINENWVVTAAHCGVTTSDVVVAGEFDQGSSSEKIQKLKIAKVFKNSKYNSLTINNDITLLKLSTAASFSQTVSAVCLPSASDDFAAGTTCVTTGWGLTRYTNANTPDRLQQASLPLLSNTNCKKYWGTKIKDAMICAGASGVSSCMGDSGGPLVCKKNGAWTLVGIVSWGSSTCSTSTPGVYARVTALVNWVQQTLAAN"
            }
        ]
    }, {
        trackId: "blockTrack",
        trackHeight: 20,
        trackColor: "#F9F9F9",
        displayType: "block" /* BLOCK */,
        displayColor: "#76ae91",
        rowTitle: "FEATURE",
        trackData: [{
            begin: 20,
            end: 25
        }, {
            begin: 150,
            end: 160
        }]
    }
];
var rowConfigChainB = [
    {
        trackId: "sequenceTrack",
        trackHeight: 20,
        trackColor: "#F9F9F9",
        displayType: "sequence" /* SEQUENCE */,
        nonEmptyDisplay: true,
        rowTitle: "CHAIN B",
        trackData: [
            {
                begin: 1,
                value: "TEFGSELKSFPEVVGKTVDQAREYFTLHYPQYDVYFLPEGSPVTLDLRYNRVRVFYNPGTNVVNHVPHVG"
            }
        ]
    }, {
        trackId: "blockTrack",
        trackHeight: 20,
        trackColor: "#F9F9F9",
        displayType: "block" /* BLOCK */,
        displayColor: "#f17070",
        rowTitle: "FEATURE",
        trackData: [{
            begin: 20,
            end: 50
        }]
    }
];
var fvConfigChainA = {
    boardId: "1acb.A_board",
    boardConfig: {
        range: {
            min: 1,
            max: 245
        },
        disableMenu:true,
        rowTitleWidth: 80,
        trackWidth: 620,
        includeAxis: true
    },
    rowConfig: rowConfigChainA,
    sequenceSelectionChangeCallback: function (plugin, selectorManager, sequenceRegion) {
        selectorManager.clearSelection("select", { modelId: "1acb_board", labelAsymId: "A" });
        plugin.clearSelection("select", { modelId: "1acb_board", labelAsymId: "A" });
        if (sequenceRegion.length > 0) {
            var regions = sequenceRegion.map(function (r) {
                var _a;
                return ({
                    modelId: "1acb_board",
                    labelAsymId: "A",
                    region: { begin: r.begin, end: (_a = r.end) !== null && _a !== void 0 ? _a : r.begin, source: "sequence" }
                });
            });
            selectorManager.addSelectionFromMultipleRegions(regions, "select");
            plugin.select(regions.map(function (r) { return (__assign(__assign({}, r), { begin: r.region.begin, end: r.region.end })); }), "select", "add");
        }
        else {
            plugin.resetCamera();
        }
    },
    sequenceElementClickCallback: function (plugin, selectorManager, d) {
        var _a;
        if (d != null)
            plugin.cameraFocus("1acb_board", "A", d.begin, (_a = d.end) !== null && _a !== void 0 ? _a : d.begin);
    },
    sequenceHoverCallback: function (plugin, selectorManager, elements) {
        if (elements == null || elements.length == 0)
            plugin.clearSelection("hover");
        else
            plugin.select(elements.map(function (e) {
                var _a;
                return ({
                    modelId: "1acb_board",
                    labelAsymId: "A",
                    begin: e.begin,
                    end: (_a = e.end) !== null && _a !== void 0 ? _a : e.begin
                });
            }), "hover", "set");
    },
    structureSelectionCallback: function (plugin, pfv, selection) {
        var sel = selection.getSelectionWithCondition("1acb_board", "A", "select");
        if (sel == null) {
            pfv.clearSelection("select");
            plugin.resetCamera();
        }
        else {
            pfv.setSelection({ elements: sel.regions, mode: "select" });
        }
    },
    structureHoverCallback: function (plugin, pfv, selection) {
        var sel = selection.getSelectionWithCondition("1acb_board", "A", "hover");
        if (sel == null)
            pfv.clearSelection("hover");
        else
            pfv.setSelection({ elements: sel.regions, mode: "hover" });
    }
};
var fvConfigChainB = {
    boardId: "1acb.B_board",
    boardConfig: {
        range: {
            min: 1,
            max: 70
        },
        disableMenu:true,
        rowTitleWidth: 80,
        trackWidth: 620,
        includeAxis: true
    },
    rowConfig: rowConfigChainB,
    sequenceSelectionChangeCallback: function (plugin, selectorManager, sequenceRegion) {
        selectorManager.clearSelection("select", { modelId: "1acb_board", labelAsymId: "B" });
        plugin.clearSelection("select", { modelId: "1acb_board", labelAsymId: "B" });
        if (sequenceRegion.length > 0) {
            var regions = sequenceRegion.map(function (r) {
                var _a;
                return ({
                    modelId: "1acb_board",
                    labelAsymId: "B",
                    region: { begin: r.begin, end: (_a = r.end) !== null && _a !== void 0 ? _a : r.begin, source: "sequence" }
                });
            });
            selectorManager.addSelectionFromMultipleRegions(regions, "select");
            plugin.select(regions.map(function (r) { return (__assign(__assign({}, r), { begin: r.region.begin, end: r.region.end })); }), "select", "add");
        }
        else {
            plugin.resetCamera();
        }
    },
    sequenceElementClickCallback: function (plugin, selectorManager, d) {
        var _a;
        if (d != null)
            plugin.cameraFocus("1acb_board", "B", d.begin, (_a = d.end) !== null && _a !== void 0 ? _a : d.begin);
    },
    sequenceHoverCallback: function (plugin, selectorManager, elements) {
        if (elements == null || elements.length == 0)
            plugin.clearSelection("hover");
        else
            plugin.select(elements.map(function (e) {
                var _a;
                return ({
                    modelId: "1acb_board",
                    labelAsymId: "B",
                    begin: e.begin,
                    end: (_a = e.end) !== null && _a !== void 0 ? _a : e.begin
                });
            }), "hover", "set");
    },
    structureSelectionCallback: function (plugin, pfv, selection) {
        var sel = selection.getSelectionWithCondition("1acb_board", "B", "select");
        if (sel == null) {
            pfv.clearSelection("select");
            plugin.resetCamera();
        }
        else {
            pfv.setSelection({ elements: sel.regions, mode: "select" });
        }
    },
    structureHoverCallback: function (plugin, pfv, selection) {
        var sel = selection.getSelectionWithCondition("1acb_board", "B", "hover");
        if (sel == null)
            pfv.clearSelection("hover");
        else
            pfv.setSelection({ elements: sel.regions, mode: "hover" });
    }
};
var blockChainA = {
    blockId: "chainA",
    featureViewConfig: [fvConfigChainA]
};
var blockChainB = {
    blockId: "chainB",
    featureViewConfig: [fvConfigChainB]
};
var blockSelectorElement = function (blockSelectorManager) {
    return (React.createElement("div", null,
        React.createElement("select", { onChange: function (e) {
                    blockSelectorManager.setActiveBlock(e.target.value);
                } },
            React.createElement("option", { value: "chainA" }, "Chain A"),
            React.createElement("option", { value: "chainB" }, "Chain B"))));
};
var customConfig = {
    blockConfig: [blockChainA, blockChainB],
    blockSelectorElement: blockSelectorElement
};
var sequenceConfig = {
    title: undefined,
    subtitle: undefined,
    config: customConfig
};
var molstarConfig = {
    loadConfig: {
        loadMethod: "loadPdbIds",
        loadParams: [{
            pdbId: "1acb",
            id: "1acb_board"
        }]
    },
    pluginConfig: {
        showImportControls: true,
        showSessionControls: false
    },
};

document.addEventListener("DOMContentLoaded", function (event) {
    var panel3d = new RcsbFv3D.custom({
        elementId: "pfv",
        structurePanelConfig: molstarConfig,
        sequencePanelConfig: sequenceConfig,
        cssConfig: {
            overwriteCss:true,
            rootPanel:{
                display:"flex",
                flexDirection:"column-reverse"
            },
            structurePanel:{
                width: 700,
                height: 700
            },
            sequencePanel:{
                width:700,
                marginBottom:5
            }
        },
    });
    panel3d.render();
});
</script>
--->
### CDN JavaScript
`<script src="https://cdn.jsdelivr.net/npm/@rcsb/rcsb-saguaro-3d@1.0.0/build/dist/app.js" type="text/javascript"></script>`

### Node Module Instalation
`npm install @rcsb/rcsb-saguaro-3d`

## Building & Running

### Build app
    npm install
    npm run buildApp
    
### Build examples 
    npm run buildExamples
    
From the root of the project:
    
    http-server -p PORT-NUMBER
    
and navigate to `localhost:PORT-NUMBER/build/examples/`

### Main Classes and Methods

Class **`RcsbFv3DAssembly`** file `src/RcsbFv3D/RcsbFv3DAssembly.tsx` builds a predefined view for PDB entries. This is the methods used in the RCSB PDB web portal 
(ex: [4hhb](https://www.rcsb.org/3d-sequence/4HHB)). Source code example can be found in `src/examples/assembly/index.ts`.

Class **`RcsbFv3DCustom`** file `src/RcsbFv3D/RcsbFv3DCustom.tsx` builds a customized view between one or more feature viewers and a single Molstar plugin.

Contributing
---
All contributions are welcome. Please, make a pull request or open an issue.

License
---

The MIT License

    Copyright (c) 2021 - now, RCSB PDB and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.