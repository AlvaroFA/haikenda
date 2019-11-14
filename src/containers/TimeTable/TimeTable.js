import React, { Component } from "react";
import moment from "moment";

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline";


var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

 class Timetable extends Component {
  constructor(props) {
    super(props);

    const { groups, items } ={"2","2"};
    const defaultTimeStart = moment()
      .startOf("day")
      .toDate();
    const defaultTimeEnd = moment()
      .startOf("day")
      .add(1, "day")
      .toDate();

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd
    };
  }

  groupRenderer = ({ group }) => {
    const className = group.title.includes("e") ? "highlight" : "";
    return <div className={className}>{group.title}</div>;
  };

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

    return (
      <Timeline
        groups={groups}
        groupRenderer={this.groupRenderer}
        horizontalLineClassNamesForGroup={group =>
          group.title.includes("e") ? ["highlight"] : ""
        }
        items={items}
        keys={keys}
        sidebarContent={<div>Above The Left</div>}
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        showCursorLine
        canMove={false}
        canResize={false}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
      >
        <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
      </Timeline>
    );

  }

}
export default Timetable;