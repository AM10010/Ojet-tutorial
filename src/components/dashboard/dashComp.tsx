import { h } from "preact";
import { useState, useCallback, useMemo } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "oj-c/select-single";
import "oj-c/list-view";
import "oj-c/list-item-layout";
import "oj-c/avatar";
import "ojs/ojchart";
import { CSelectSingleElement } from "oj-c/select-single";
import { data, ChartItem } from "./data";

type Activity = { value: string; label: string };

const activities: Activity[] = [
  { value: "Baseball", label: "Baseball" },
  { value: "Football", label: "Football" },
  { value: "Tennis", label: "Tennis" },
  { value: "Soccer", label: "Soccer" },
];

// Static provider for the select: created once, outside the component
const selectDataProvider = new ArrayDataProvider<string, Activity>(activities, {
  keyAttributes: "value",
});

// Chart item template
const chartItemTemplate = (item: { data: ChartItem }) => (
  <oj-chart-item
    value={item.data.value}
    groupId={[item.data.group]}
    seriesId={item.data.series}
  ></oj-chart-item>
);

// List item template (list-view context nests the row under item.data)
const listItemTemplate = (ctx: { item: { data: ChartItem } }) => {
  const row = ctx.item.data;
  return (
    <oj-c-list-item-layout>
      <span class="oj-typography-body-md oj-text-color-primary">
        {row.series}
      </span>
      <oj-c-avatar
        slot="leading"
        size="xs"
        initials={row.series.substring(0, 2).toUpperCase()}
      ></oj-c-avatar>
      <span
        slot="secondary"
        class="oj-typography-body-sm oj-text-color-secondary"
      >
        Year {row.group} · Quantity: {row.value}
      </span>
    </oj-c-list-item-layout>
  );
};

const DashComp = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  // One provider shared by the chart and the list
  const chartDataProvider = useMemo(() => {
    const rows = selectedActivity ? data[selectedActivity] ?? [] : [];
    return new ArrayDataProvider<string, ChartItem>(rows, {
      keyAttributes: "id",
    });
  }, [selectedActivity]);

  const valueChanged = useCallback(
    (event: CSelectSingleElement.valueChanged<string, Activity>) => {
      setSelectedActivity(event.detail.value ?? null);
    },
    []
  );

return (
  <div id="container" class="oj-flex">
    <div class="oj-flex-item oj-sm-12 oj-md-12 oj-lg-6 oj-xl-9">
      <oj-c-select-single
        id="select"
        label-hint="Select Single"
        label-edge="inside"
        
        item-text="label"
        data={selectDataProvider}
        value={selectedActivity}
        onvalueChanged={valueChanged}
      ></oj-c-select-single>

      <h2 class="oj-typography-heading-sm oj-sm-margin-4x-top">
        {selectedActivity ?? "No activity selected"}
      </h2>

      <div id="chart-container" class="oj-sm-margin-4x-top">
        <oj-chart
          id="pieChart"
          type="pie"
          data={chartDataProvider}
          animationOnDisplay="auto"
          animationOnDataChange="auto"
          hoverBehavior="dim"
        >
          <template slot="itemTemplate" render={chartItemTemplate}></template>
        </oj-chart>
      </div>
    </div>

    <div class="">
      <oj-c-list-view
        id="listview"
        class="list-height"
        aria-label="Activity results"
        data={chartDataProvider}
        gridlines={{ item: "visible" }}
      >
        <template slot="itemTemplate" render={listItemTemplate}></template>
      </oj-c-list-view>
    </div>
  </div>
);
};

export default DashComp;