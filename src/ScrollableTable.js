// https://github.com/bvaughn/react-virtualized/blob/master/docs/creatingAnInfiniteLoadingList.md
import React from "react";
import { InfiniteLoader, List } from "react-virtualized";

const ScrollableTable = ({
  hasNextPage,
  isNextPageLoading,
  list,
  loadNextPage
}) => {
  const rowCount = hasNextPage ? list.length + 1 : list.length;
  const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;
  const isRowLoaded = ({ index }) => !hasNextPage || index < list.length;
  const rowRenderer = ({ index, key, style }) => {
    let content;
    if (!isRowLoaded({ index })) {
      content = "Loading...";
    } else {
      content = `${list[index].first_name} ${list[index].last_name}`;
    }

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          style={{ border: "1px red solid" }}
          ref={registerChild}
          onRowsRendered={onRowsRendered}
          rowRenderer={rowRenderer}
          height={50}
          rowCount={rowCount}
          rowHeight={20}
          width={600}
        />
      )}
    </InfiniteLoader>
  );
};

export default ScrollableTable;
