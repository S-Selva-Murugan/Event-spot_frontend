import React, { useState, useEffect,memo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startRemoveCategory, addCategoryAsync, startGetCategory, startEditCategory } from '../../react-redux/action/categoryAction';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { Modal, Button } from 'react-bootstrap'; // Import React Bootstrap components
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faRemove,faDashboard} from '@fortawesome/free-solid-svg-icons';


function Create() {
  const [name, setName] = useState('');
  const [formErrors, setFormErrors] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [editName, setEditName] = useState(''); // State for editing category name
  const [editCategoryId, setEditCategoryId] = useState(null); // State for storing the ID of the category being edited
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
  }, []);

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
          await dispatch(startRemoveCategory(id));
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
    setEditCategoryId(id); // Set the ID of the category being edited
    setEditName(name); // Set the current name of the category in the input field
    setShowModal(true); // Show the modal
  };

  const handleEditSubmit = () => {
    // Dispatch action to edit category
    dispatch(startEditCategory(editCategoryId, { name: editName }));
    setShowModal(false); // Hide the modal after editing
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2 className="fw-bold">Create category here</h2>
          <form onSubmit={handleCreateCategory}>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="btn btn-dark">
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
                  {category.events.length==0 && <button className="btn btn-danger ms-2" onClick={() => handleCategoryDelete(category._id)}>
                  <FontAwesomeIcon icon={faRemove} />
                  </button>}
                  <button className="btn btn-warning ms-2" onClick={() => handleCategoryEdit(category._id, category.name)}>
                  <FontAwesomeIcon icon={faEdit } />

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

      {/* Modal for editing category */}
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
