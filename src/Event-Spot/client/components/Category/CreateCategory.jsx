import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRemoveCategory, addCategoryAsync, startGetCategory, startEditCategory } from '../../react-redux/action/categoryAction';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { Modal, Button } from 'react-bootstrap'; // Import React Bootstrap components
import Swal from 'sweetalert2';

function Create() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editName, setEditName] = useState('')
  const [editImage,setEditImage] = useState(null)
  const [editCategoryId, setEditCategoryId] = useState(null);
  
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category);

  useEffect(() => {
    dispatch(startGetCategory());
  }, [dispatch]);

  const runValidations = () => {
    const errors = {};
    if (name.trim() === '') {
      errors.name = 'Category name is required';
    }
    if (!image) {
      errors.image = 'Upload a category image';
    }
    setFormErrors(errors);
    return errors;
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const errors = runValidations();
    if (Object.keys(errors).length === 0) {
      const categoryData = new FormData();
      categoryData.append('category', name);
      categoryData.append('categoryImage', image);
      console.log([...categoryData,"i am cat"])
      dispatch(addCategoryAsync(categoryData));
      setName('');
      setImage(null);
    }
  };

  const handleCategoryDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(startRemoveCategory(id));
          Swal.fire(
            'Deleted!',
            'Your category has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting category:', error);
          Swal.fire(
            'Error!',
            'An error occurred while deleting the category.',
            'error'
          );
        }
      }
    });
  };

  const handleCategoryEdit = (id, name) => {
    setEditCategoryId(id);
    setEditName(name);
    setShowModal(true);
  };

  const handleEditSubmit = () => {
    const categoryData = new FormData();
    categoryData.append('name', editName);
    categoryData.append('categoryImage', editImage);
    dispatch(startEditCategory(editCategoryId, categoryData));
    setShowModal(false);
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
              /><br/>
              <input
                type="file"
                className={`form-control ${formErrors.image ? 'is-invalid' : ''}`}
                placeholder="Upload category Image"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <button type="submit" className="btn btn-dark">
                Create
              </button>
              {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
              {formErrors.image && <div className="invalid-feedback">{formErrors.image}</div>}
            </div>
          </form>
          <ul className="list-group">
            {categories.map((category) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={category._id}>
                <span className="fw-bold">{category.name}</span>
                <div>
                  <button className="btn btn-warning ms-2" onClick={() => handleCategoryEdit(category._id, category.name)}>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type='text'
            className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
            placeholder="Enter category name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
          <input
                type="file"
                className={`form-control ${formErrors.image ? 'is-invalid' : ''}`}
                placeholder="Upload category Image"
                onChange={(e) => setEditImage(e.target.files[0])}
              />
          {formErrors.editImage && <div className="invalid-feedback">{formErrors.editImage}</div>}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default memo(Create);
