import React, { Component } from "react";
import moment from "moment";
import generateFakeData from './fake-data';
import './Timetable.css';
import "react-calendar-timeline/lib/Timeline.css";

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

    const { groups, items } = generateFakeData();
    const defaultTimeStart = moment()
      .startOf("Month")
      .toDate();
    const defaultTimeEnd = moment()
      .startOf("Month")
      .add(1, "Month")
      .toDate();
    const minZoom= 7*24*60*60*1000;
    const maxZoom= 2592000000;
    const canResize=false;

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      canResize,
      minZoom,
      maxZoom
    };
  }

  groupRenderer = ({ group }) => {
    const className = group.title.includes("e") ? "highlight" : "";
    return <div className={className}>{group.title}</div>;
  };

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd, canResize, minZoom, maxZoom } = this.state;

    return (
        <div className="container">
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
        canResize={canResize}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        minZoom= {minZoom}
        maxZoom= {maxZoom}
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
      </div>
    );

  }

}
export default Timetable;