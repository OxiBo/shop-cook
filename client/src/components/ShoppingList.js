// TODO - rethink the overall structure

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import User from "./RenderProp/User";
import {
  updateShoppingListItem,
  emptyShoppingList,
  fetchShoppingList,
  isLoadingShoppingList,
  addToShoppingList,
  createShoppingList,
} from '../actions';
import { Heading2 } from './styles/text';
import Button from './styles/Button';
import ErrorText from './styles/ErrorText';
import { device } from './styles/breakpoints';
console.log(device.tablet);
const ShoppingListStyles = styled.div`
  grid-area: shopping-list;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  //background-color: mistyrose;
  form {
    width: 90%;
    margin: 0 auto;
    ul {
      list-style: none;
      max-height: 77rem;
      overflow: auto;
      border-bottom: 1px solid #f2efee;
      li:not(:last-child) {
        border-bottom: 1px solid #f2efee;
      }

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.3rem 0;
        position: relative;

        button {
          //opacity: 1;
          display: none;
          transform: translateY(-1px);
        }

        :hover button {
          display: block;
          opacity: 1;
          visibility: visible;
          //  background-color: red;
          transform: translateY(-1px);
        }

        div {
          flex: 0 0 10rem;
          min-width: 10rem;
          padding: 0.4rem 0.5rem;
          border: 1px solid #f2efee;
          border-radius: 3px;
          margin-right: 2rem;
          //cursor: pointer;// TODO -WHY?
          display: flex;
          justify-content: space-between;
          input {
            color: inherit;
            font-family: inherit;
            font-size: 1.2rem;
            text-align: center;
            border: none;
            width: 3.9rem;
            border-radius: 3px;
            :focus {
              outline: none;
              background-color: #f2efee;
            }
          }
          p {
            font-size: 1.2rem;
            margin: 0;
          }
        }
        p {
          flex: 1;
          font-size: 1.3rem;
          margin-top: 0.4rem;
          margin-right: 1.5rem;
        }
        button {
          height: 1.75rem;
          width: 1.75rem;
          border: none;
          background: none;
          cursor: pointer;
          margin-top: 0.5rem;
          position: absolute;
          right: 0;
          background-image: linear-gradient(
            to right,
            transparent 50%,
            #fff 40%,
            #fff 100%
          );
          width: 3.75rem;
          padding-left: 2rem;
          visibility: hidden;
          opacity: 0;
          transition: all 0.5s;
          z-index: 10;
          i {
            color: ${(props) => props.theme.themeColor};
            :active {
              transform: translateY(0);
            }
          }
          :focus {
            outline: none;
          }
          @media only screen and (max-width: 768px) {
            opacity: 1;
            visibility: visible;
            display: block;
          }
        }
      }
    }
  }
  div {
    h3 {
      text-align: center;
      padding: 1rem;
    }
  }
`;

const AddItemForm = styled.form`
  margin: 1rem 0;
  /* padding: 1rem; */
  input {
    padding: 1rem;
    color: inherit;
    font-family: inherit;
    font-size: 1.2rem;
    border: 1px solid #f2efee;
    border-radius: 3px;
    width: 100%;
    :focus {
      outline: none;
      background-color: #f2efee;
    }
  }
`;

const MailInputs = styled.div`
  margin: 1rem 0;
  div {
    display: flex;
    color: inherit;
    font-family: inherit;
    font-size: 1.2rem;
    align-items: center;
    justify-content: center;
    input {
      width: 25%;
      margin: 0.5rem;
    }
    label,
    p {
      flex: 1;
    }
  }
  input {
    padding: 1rem;
    color: inherit;
    font-family: inherit;
    font-size: 1.2rem;
    border: 1px solid #f2efee;
    border-radius: 3px;
    width: 100%;
    :focus {
      outline: none;
      background-color: #f2efee;
    }
  }
`;

const SingleButtonDiv = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShoppingList = ({
  user,
  userError,
  updateShoppingListItem,
  addToShoppingList,
  shoppingList,
  emptyShoppingList,
  fetchShoppingList,
  isLoadingShoppingList,
  createShoppingList,
  // userDefaultEmail,
}) => {
  const userDefaultEmail = user
    ? user && (user.local ? user.local.email : user.google.email)
    : '';

  // state for the main form
  const [shoppingItems, setShoppingItems] = useState(shoppingList);
  // state for the form "add item"
  const [addedItem, setAddedItem] = useState({});

  // state for the emailing the list
  const [mailIt, setMailIt] = useState(false);
  const [myEmail, setMyEmail] = useState(userDefaultEmail);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    // isLoadingShoppingList();
    // fetchShoppingList();
    setShoppingItems(shoppingList);
  }, [shoppingList, fetchShoppingList, isLoadingShoppingList]);

  // TODO - add single item to shopping list in the app state not just local component state: use this action - addToShoppingList(recipe.ingredients) with the single ingredient

  const handleChange = (e, index, name, unit, original = '') => {
    const values = [...shoppingItems];
    values[index] = { ...values[index], amount: +e.target.value };
    setShoppingItems(values);
  };
  const handleDelete = (index) => {
    const values = [...shoppingItems];
    values.splice(index, 1);
    setShoppingItems(values);
  };
  const handleAdd = (item) => {
    const values = [...shoppingItems];
    if (shoppingItems.length) {
      const itemExists = shoppingItems.findIndex(({ name, unit }) =>
        unit ? name === item.name && unit === item.unit : name === item.name
      );
      // console.log(itemExists);
      if (itemExists >= 0) {
        console.log(typeof values[itemExists].amount);
        const newAmount = values[itemExists].amount + item.amount;
        values[itemExists].amount = newAmount;
      } else {
        values.push(item);
      }
    } else {
      values.push(item);
    }

    setShoppingItems(values);
  };
  // for the form 'add item'
  const handleAddItemChange = (e) => {
    const { name, value, type } = e.target;

    const val = type === 'number' ? parseFloat(value) || value : value;
    const values = { ...addedItem, [name]: val };
    setAddedItem(values);
    // console.log(addedItem);
  };

  // return (
  //   <User>
  //     {(user) => {
  // TODO - prevent form submission on ENTER key press
  return (
    <ShoppingListStyles breakPoint={device}>
      <Heading2>My Shopping List</Heading2>
      {shoppingItems.length > 0 ? (
        <>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              if (!emailError) {
                createShoppingList([...shoppingItems, { email: myEmail }]);
              }
            }}
          >
            <ul>
              {shoppingList &&
                shoppingItems.length !== 0 &&
                shoppingItems.map(({ amount, name, unit, original }, index) => {
                  {
                    /* console.log(amount, name, unit, original); */
                  }

                  return (
                    <li key={index}>
                      <div>
                        <input
                          type="text"
                          name={name}
                          value={shoppingItems[index].amount}
                          onChange={(e) =>
                            handleChange(e, index, name, unit, original)
                          }
                          onBlur={(e) => {
                            updateShoppingListItem({
                              amount: +e.target.value,
                              name,
                              unit,
                              original,
                            });
                          }}
                          min={0}
                        />
                        <p>{unit}</p>
                      </div>
                      <p>{name}</p>
                      <button type="button" onClick={() => handleDelete(index)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </li>
                  );
                })}
            </ul>

            {user && (
              <>
                <MailInputs>
                  <div>
                    <input
                      type="checkbox"
                      id="mail"
                      name="mail"
                      value={mailIt}
                      onChange={() => {
                        setEmailError('');
                        setMyEmail(userDefaultEmail);
                        setMailIt(!mailIt);
                      }}
                    />
                    <p htmlFor="mail"> Mail it</p>
                  </div>
                  {mailIt && (
                    <>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={myEmail}
                        onChange={(e) => setMyEmail(e.target.value)}
                        required
                        onBlur={() => {
                          if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                              myEmail
                            )
                          ) {
                            setEmailError('Invalid email address');
                          }
                        }}
                      />
                      {emailError && <ErrorText>{emailError}</ErrorText>}
                    </>
                  )}
                </MailInputs>
                <SingleButtonDiv className="button">
                  {' '}
                  <Button type="submit">
                    {' '}
                    <i className="fas fa-share"></i>
                    <span>Create List</span>
                  </Button>
                </SingleButtonDiv>
              </>
            )}
          </form>
        </>
      ) : (
        <div>
          <h3>Your shopping list is empty</h3>
        </div>
      )}
      <AddItemForm
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd(addedItem);
          setAddedItem({});
        }}
      >
        <div>
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            min="0"
            value={addedItem.amount || ''}
            onChange={(e) => handleAddItemChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Unit"
            name="unit"
            value={addedItem.unit || ''}
            onChange={(e) => handleAddItemChange(e)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Item Name"
            name="name"
            value={addedItem.name || ''}
            onChange={(e) => handleAddItemChange(e)}
            required
          />
        </div>
        <SingleButtonDiv>
          <Button type="submit">
            <i className="fas fa-plus-circle"></i> <span>Add Item</span>
          </Button>
        </SingleButtonDiv>
      </AddItemForm>
      {shoppingItems.length > 0 && (
        <SingleButtonDiv>
          <Button
            onClick={() => {
              setShoppingItems([]);
              emptyShoppingList();
            }}
          >
            <i className="fas fa-trash-alt"></i>
            <span>Delete all </span>
          </Button>
        </SingleButtonDiv>
      )}
    </ShoppingListStyles>
  );
  //     }}
  //   </User>
  // );
};

const mapStateToProps = ({ shoppingLists, auth: { user } }) => {
  // console.log(shoppingList)
  return {
    shoppingList: shoppingLists.shoppingList,
    isLoading: shoppingLists.isLoading,
    createListError: shoppingLists.createListError,
    // userDefaultEmail: user
    //   ? user && (user.local ? user.local.email : user.google.email)
    //   : "",
  };
};

export default connect(mapStateToProps, {
  addToShoppingList,
  emptyShoppingList,
  fetchShoppingList,
  isLoadingShoppingList,
  createShoppingList,
  updateShoppingListItem,
})(ShoppingList);
