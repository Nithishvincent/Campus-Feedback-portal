import "./FeedbackChart.css"

const FeedbackChart = ({ feedbacks }) => {
  // Calculate category data
  const categoryData = feedbacks.reduce((acc, feedback) => {
    acc[feedback.category] = (acc[feedback.category] || 0) + 1
    return acc
  }, {})

  // Calculate rating data
  const ratingData = feedbacks.reduce((acc, feedback) => {
    acc[feedback.rating] = (acc[feedback.rating] || 0) + 1
    return acc
  }, {})

  const maxCategoryCount = Math.max(...Object.values(categoryData), 1)
  const maxRatingCount = Math.max(...Object.values(ratingData), 1)

  const categories = ["faculty", "events", "facilities", "general"]
  const ratings = ["excellent", "good", "average", "poor"]

  return (
    <div className="charts-container">
      <div className="chart-card">
        <div className="chart-header">
          <h3>Feedback by Category</h3>
          <p>Distribution of feedback across different categories</p>
        </div>
        <div className="bar-chart">
          {categories.map((category) => {
            const count = categoryData[category] || 0
            const height = (count / maxCategoryCount) * 200
            return (
              <div key={category} className="bar-container">
                <div className="bar-wrapper">
                  <div className="bar" style={{ height: `${height}px` }} title={`${category}: ${count}`}></div>
                </div>
                <div className="bar-label">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
                <div className="bar-count">{count}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h3>Rating Distribution</h3>
          <p>Overall satisfaction ratings</p>
        </div>
        <div className="pie-chart">
          <div className="pie-visual">
            {ratings.map((rating, index) => {
              const count = ratingData[rating] || 0
              const percentage = feedbacks.length > 0 ? (count / feedbacks.length) * 100 : 0
              return (
                <div
                  key={rating}
                  className={`pie-segment pie-${rating}`}
                  style={{
                    "--percentage": `${percentage}%`,
                  }}
                >
                  <span className="pie-label">
                    {rating}: {count}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="pie-legend">
            {ratings.map((rating) => {
              const count = ratingData[rating] || 0
              const percentage = feedbacks.length > 0 ? Math.round((count / feedbacks.length) * 100) : 0
              return (
                <div key={rating} className="legend-item">
                  <div className={`legend-color legend-${rating}`}></div>
                  <span>
                    {rating.charAt(0).toUpperCase() + rating.slice(1)}: {percentage}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackChart
