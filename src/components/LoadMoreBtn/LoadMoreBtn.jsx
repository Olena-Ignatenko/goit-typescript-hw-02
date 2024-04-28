import css from './LoadMoreBtn.module.css'

const LoadMoreBtn = ({ onLoadMore, hasMore }) => {
  if (!hasMore) {
    return null;
  }

  return (
    <button className={css.loadMoreBtn} onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
