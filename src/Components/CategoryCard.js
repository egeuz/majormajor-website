import React, { useContext } from 'react'
import { GlobalState } from '../App'
import { RichText } from 'prismic-reactjs'
import CategoryProjectList from './CategoryProjectList'

function CategoryCard({ category }) {

  const { state, dispatch } = useContext(GlobalState)
  const thisCategory = category.category_name[0].text

  const expandCategory = () => {
    dispatch({ type: "set-current-category", category })
  }

  const clearCategory = () => {
    dispatch({ type: "set-current-category", category: "" })
  }

  return (
    <div className={`category-card ${state.currentCategory && state.currentCategory.category_name[0].text === thisCategory ? "active" : ""}`}>
      <div className="category-info">
        <h3 onClick={!state.currentCategory || state.currentCategory.category_name[0].text !== thisCategory ? expandCategory : clearCategory}>
          {RichText.asText(category.category_name)}
        </h3>
        <p>x projects</p>
      </div>
      <div className="desktop-category-details">
        <p>{RichText.asText(category.category_description)}</p>
      </div>
      <div className="mobile-category-details">
        <img src={category.category_image.url} alt={category.category_image.alt} />
        <p>{RichText.asText(category.category_description)}</p>
        <CategoryProjectList />
      </div>
      <button
        className="mobile-category-expand"
        onClick={!state.currentCategory || state.currentCategory.category_name[0].text !== thisCategory ? expandCategory : clearCategory}
      />
    </div>
  )
}

export default CategoryCard