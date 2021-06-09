import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from '../FlexContainer';
import HighlightText from '../HighlightText';
import RightArrow from '../Icon/RightArrow';

import { PRODUCTS_PER_PAGE } from '../../../constants/appInfo';
import PALETTE from '../../../constants/palette';

import * as Styled from './style';

const Pagination = ({
  pages,
  onPagePrevious,
  onPageNext,
  onPageSelected,
  isNextPageAvailable,
  isPreviousPageAvailable,
  currentPage,
}) => {
  return (
    <FlexContainer height="5rem" width="100%" margin="3rem 0 0 0" align="center" justifyContent="center">
      <Styled.PreviousButton onClick={onPagePrevious} disabled={!isPreviousPageAvailable}>
        <RightArrow color={isPreviousPageAvailable ? PALETTE.BAEMINT : PALETTE.GRAY_003} />
      </Styled.PreviousButton>
      <Styled.NumbersContainer>
        {Array(Math.ceil(pages / PRODUCTS_PER_PAGE))
          .fill(0)
          .map((_, idx) => (
            <Styled.PageNumber key={idx} onClick={onPageSelected(idx)}>
              {currentPage === idx + 1 ? (
                <HighlightText highlightColor={PALETTE.BAEMINT} fontSize="1.3rem">
                  {idx + 1}
                </HighlightText>
              ) : (
                <span>{idx + 1}</span>
              )}
            </Styled.PageNumber>
          ))}
      </Styled.NumbersContainer>
      <Styled.NextButton onClick={onPageNext} disabled={!isNextPageAvailable}>
        <RightArrow color={isNextPageAvailable ? PALETTE.BAEMINT : PALETTE.GRAY_003} />
      </Styled.NextButton>
    </FlexContainer>
  );
};

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  onPagePrevious: PropTypes.func.isRequired,
  onPageNext: PropTypes.func.isRequired,
  onPageSelected: PropTypes.func,
  isPreviousPageAvailable: PropTypes.bool,
  isNextPageAvailable: PropTypes.bool,
  currentPage: PropTypes.number.isRequired,
};

export default React.memo(Pagination);
