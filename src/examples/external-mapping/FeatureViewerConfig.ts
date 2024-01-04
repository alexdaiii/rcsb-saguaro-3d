import {RcsbFvTrackDataElementInterface} from "@rcsb/rcsb-saguaro/lib/RcsbDataManager/RcsbDataManager";
import {RcsbFv} from "@rcsb/rcsb-saguaro/lib/RcsbFv/RcsbFv";
import {RcsbFvRowConfigInterface} from "@rcsb/rcsb-saguaro/lib/RcsbFv/RcsbFvConfig/RcsbFvConfigInterface";
import {RcsbFvDisplayTypes} from "@rcsb/rcsb-saguaro/lib/RcsbFv/RcsbFvConfig/RcsbFvDefaultConfigValues";

import {FeatureViewInterface} from "../../RcsbFvSequence/SequenceViews/CustomView/CustomView";
import {RegionSelectionInterface} from "../../RcsbFvState/RcsbFvSelectorManager";
import {RcsbFvStateInterface} from "../../RcsbFvState/RcsbFvStateInterface";
import {
  SaguaroRegionList,
  StructureViewerPublicInterface,
} from "../../RcsbFvStructure/StructureViewerInterface";

const rowConfig: Array<RcsbFvRowConfigInterface> = [
  {
    trackId: "sequenceTrack",
    trackHeight: 20,
    trackColor: "#F9F9F9",
    displayType: RcsbFvDisplayTypes.SEQUENCE,
    nonEmptyDisplay: true,
    rowTitle: "1ASH SEQUENCE",
    trackData: [
      {
        begin: 1,
        label:
          "ANKTRELCMKSLEHAKVDTSNEARQDGIDLYKHMFENYPPLRKYFKSREEYTAEDVQNDPFFAKQGQKILLACHVLCATYDDRETFNAYTRELLDRHARDHVHMPPEVWTDFWKLFEEYLGKKTTLDEPTKQAWHEIGREFAKEINKHGR",
      },
    ],
  },
  {
    trackId: "blockTrack",
    trackHeight: 20,
    trackColor: "#F9F9F9",
    displayType: RcsbFvDisplayTypes.BLOCK,
    displayColor: "#FF0000",
    rowTitle: "1ASH",
    trackData: [
      {
        begin: 30,
        end: 60,
      },
    ],
  },
];

export const fvConfig1: FeatureViewInterface<any, any> = {
  boardId: "1ash_board",
  boardConfig: {
    range: {
      min: 1,
      max: 150,
    },
    rowTitleWidth: 190,
    includeAxis: true,
  },
  rowConfig: rowConfig,
  sequenceSelectionChangeCallback: (
    plugin: StructureViewerPublicInterface<any, any>,
    stateManager: RcsbFvStateInterface,
    sequenceRegion: Array<RcsbFvTrackDataElementInterface>,
  ) => {
    stateManager.selectionState.clearSelection("select", {
      modelId: "structure_1",
      labelAsymId: "A",
    });
    if (sequenceRegion.length > 0) {
      const regions = sequenceRegion.map((r) => ({
        modelId: "structure_1",
        labelAsymId: "A",
        region: {
          begin: r.begin,
          end: r.end ?? r.begin,
          source: "sequence",
        } as RegionSelectionInterface,
      }));
      stateManager.selectionState.addSelectionFromMultipleRegions(
        regions,
        "select",
      );
      plugin.select(
        regions.map((r) => ({
          ...r,
          begin: r.region.begin,
          end: r.region.end,
        })),
        "select",
        "set",
      );
    } else {
      plugin.clearSelection("select", {
        modelId: "structure_1",
        labelAsymId: "A",
      });
      plugin.resetCamera();
    }
  },
  sequenceElementClickCallback: (
    plugin: StructureViewerPublicInterface<any, any>,
    stateManager: RcsbFvStateInterface,
    d?: RcsbFvTrackDataElementInterface,
  ) => {
    if (d != null)
      plugin.cameraFocus("structure_1", "A", d.begin, d.end ?? d.begin);
  },
  sequenceHoverCallback: (
    plugin: StructureViewerPublicInterface<any, any>,
    stateManager: RcsbFvStateInterface,
    elements: Array<RcsbFvTrackDataElementInterface>,
  ) => {
    if (elements == null || elements.length == 0)
      plugin.clearSelection("hover");
    else
      plugin.select(
        elements.map((e) => ({
          modelId: "structure_1",
          labelAsymId: "A",
          begin: e.begin,
          end: e.end ?? e.begin,
        })),
        "hover",
        "set",
      );
  },
  structureSelectionCallback: (
    plugin: StructureViewerPublicInterface<any, any>,
    pfv: RcsbFv,
    stateManager: RcsbFvStateInterface,
  ) => {
    const sel: SaguaroRegionList | undefined =
      stateManager.selectionState.getSelectionWithCondition(
        "structure_1",
        "A",
        "select",
      );
    if (sel == null) {
      pfv.clearSelection("select");
      plugin.resetCamera();
    } else {
      pfv.setSelection({elements: sel.regions, mode: "select"});
    }
  },
  structureHoverCallback: (
    plugin: StructureViewerPublicInterface<any, any>,
    pfv: RcsbFv,
    stateManager: RcsbFvStateInterface,
  ) => {
    const sel: SaguaroRegionList | undefined =
      stateManager.selectionState.getSelectionWithCondition(
        "structure_1",
        "A",
        "hover",
      );
    if (sel == null) pfv.clearSelection("hover");
    else pfv.setSelection({elements: sel.regions, mode: "hover"});
  },
};

export const fvConfig2: FeatureViewInterface<any, any> = {
  boardId: "1ash_board_bis",
  boardConfig: {
    range: {
      min: 1,
      max: 150,
    },
    rowTitleWidth: 190,
    includeAxis: true,
  },
  rowConfig: rowConfig,
  sequenceSelectionChangeCallback: (
    plugin: StructureViewerPublicInterface<any, any>,
    stateManager: RcsbFvStateInterface,
    sequenceRegion: Array<RcsbFvTrackDataElementInterface>,
  ) => {
    stateManager.selectionState.clearSelection("select", {
      modelId: "structure_2",
      labelAsymId: "A",
    });
    if (sequenceRegion.length > 0) {
      const regions = sequenceRegion.map((r) => ({
        modelId: "structure_2",
        labelAsymId: "A",
        region: {
          begin: r.begin,
          end: r.end ?? r.begin,
          source: "sequence",
        } as RegionSelectionInterface,
      }));
      stateManager.selectionState.addSelectionFromMultipleRegions(
        regions,
        "select",
      );
      plugin.select(
        regions.map((r) => ({
          ...r,
          begin: r.region.begin,
          end: r.region.end,
        })),
        "select",
        "set",
      );
    } else {
      plugin.clearSelection("select", {
        modelId: "structure_2",
        labelAsymId: "A",
      });
      plugin.resetCamera();
    }
  },
  sequenceElementClickCallback: (
    plugin: StructureViewerPublicInterface<any, any>,
    stateManager: RcsbFvStateInterface,
    d?: RcsbFvTrackDataElementInterface,
  ) => {
    if (d != null)
      plugin.cameraFocus("structure_2", "A", d.begin, d.end ?? d.begin);
  },
  sequenceHoverCallback: (
    plugin: StructureViewerPublicInterface<any, any>,
    stateManager: RcsbFvStateInterface,
    elements: Array<RcsbFvTrackDataElementInterface>,
  ) => {
    if (elements == null || elements.length == 0)
      plugin.clearSelection("hover");
    else
      plugin.select(
        elements.map((e) => ({
          modelId: "structure_2",
          labelAsymId: "A",
          begin: e.begin,
          end: e.end ?? e.begin,
        })),
        "hover",
        "set",
      );
  },
  structureSelectionCallback: (
    plugin: StructureViewerPublicInterface<any, any>,
    pfv: RcsbFv,
    stateManager: RcsbFvStateInterface,
  ) => {
    const sel: SaguaroRegionList | undefined =
      stateManager.selectionState.getSelectionWithCondition(
        "structure_2",
        "A",
        "select",
      );
    if (sel == null) {
      pfv.clearSelection("select");
      plugin.resetCamera();
    } else {
      pfv.setSelection({elements: sel.regions, mode: "select"});
    }
  },
  structureHoverCallback: (
    plugin: StructureViewerPublicInterface<any, any>,
    pfv: RcsbFv,
    stateManager: RcsbFvStateInterface,
  ) => {
    const sel: SaguaroRegionList | undefined =
      stateManager.selectionState.getSelectionWithCondition(
        "structure_2",
        "A",
        "hover",
      );
    if (sel == null) pfv.clearSelection("hover");
    else pfv.setSelection({elements: sel.regions, mode: "hover"});
  },
};
