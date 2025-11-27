import React from "react";
// Importar PropTypes para validação (Adiciona robustez)
import PropTypes from "prop-types"; 
import styles from "./CategoryBadge.module.css";


const normalizeCategory = (category) => {
  if (!category) return "";
  return category
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-'); 
};

export default function CategoryBadge({ category }) {
  
  if (!category) {
    return null;
  }

 
  const categoryClass = normalizeCategory(category);
  
  
  const classNames = `${styles.badge} ${styles[`badge-${categoryClass}`] || ''}`.trim();

  return <span className={classNames}>{category}</span>;
}


CategoryBadge.propTypes = {
  category: PropTypes.string.isRequired,
};