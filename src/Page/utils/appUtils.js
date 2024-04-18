import _ from "lodash";

export const returnPaginationRange = (totalPage, page, limit, siblings) => {
  let totalPageNOInArray = 7 + siblings;

  if (totalPageNOInArray >= totalPage) {
    return _.range(1, totalPage + 1);
  }

  let leftSliblingsIndex = Math.max(page - siblings, 1);
  let rightSliblingIndex = Math.min(page + siblings, totalPage);

  let showLeftDots = leftSliblingsIndex > 2;
  let showRightDots = rightSliblingIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemCount + 1);

    return [...leftRange, "...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightItemCount = 3 + 2 * siblings;
    let leftRange = _.range(totalPage - rightItemCount + 1, totalPage);
    return [1, "...", ...leftRange];
  } else {
    let middleRange = _.range(leftSliblingsIndex, rightSliblingIndex + 1);
    return [1, "...", ...middleRange, "...", totalPage];
  }
};
