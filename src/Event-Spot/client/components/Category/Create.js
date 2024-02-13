import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startRemoveCategory, addCategoryAsync, startGetCategory } from '../../react-redux/action/categoryAction';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

function Create() {
  const [name, setName] = useState('');
  const [formErrors, setFormErrors] = useState([]);
  const dispatch = useDispatch();

  const runValidations = () => {
    const errors = {};
    if (name.trim() === '') {
      errors.name = 'Category name is required';
    }
    setFormErrors(errors);
    return errors;
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const errors = runValidations();
    if (Object.keys(errors).length === 0) {
      const categoryData = {
        name: name.trim(),
      };
      dispatch(addCategoryAsync(categoryData));
      setName('');
    }
  };

  const categories = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(startGetCategory());
  }, [dispatch]);

  const handleCategoryDelete = (id) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this category?');
    if (confirmDeletion) {
      dispatch(startRemoveCategory(id));
    }
  };

  const handleCategoryEdit = (id) => {
    // Implement category edit logic if needed
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <strong className="mb-3">Create category</strong>
          <form onSubmit={handleCreateCategory}>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Create
              </button>
              {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
            </div>
          </form>
          <ul className="list-group">
            {categories.map((category) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={category._id}>
                <span className="fw-bold">{category.name}</span>
                <div>
                  <button className="btn btn-warning ms-2" onClick={() => handleCategoryEdit(category._id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger ms-2" onClick={() => handleCategoryDelete(category._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          {/* Content for the right half */}
          {/* Add any additional content or components you want in the right half */}
        </div>
      </div>
    </div>
  );
}

export default Create;
