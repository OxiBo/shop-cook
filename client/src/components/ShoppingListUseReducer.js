import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchShoppingList, isLoadingShoppingList } from "../actions";
import { Heading2 } from "./styles/text";
import Button from "./styles/Button";
const ShoppingListStyles = styled.div`
  grid-area: shopping-list;
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  form {
    ul {
      list-style: none;
      max-height: 77rem;
      overflow: scroll;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.3rem 0;
        border-bottom: 1px solid #f2efee;
        position: relative;
        :hover button {
          opacity: 1;
          visibility: visible;
          transform: translateY(-1px);
        }
        div {
          flex: 0 0 10rem;
          min-width: 10rem;
          padding: 0.4rem 0.5rem;
          border: 1px solid #f2efee;
          border-radius: 3px;
          margin-right: 2rem;
          cursor: pointer;
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
            transparent 0%,
            #fff 40%,
            #fff 100%
          );
          width: 3.75rem;
          padding-left: 2rem;
          visibility: hidden;
          opacity: 0;
          transition: all 0.5s;

          i {
            color: ${(props) => props.theme.themeColor};
            :active {
              transform: translateY(0);
            }
          }
          :focus {
            outline: none;
          }
        }
      }
    }
  }
  div {
    h3 {
      text-align: center;
    }
  }
`;

/*

 value={unit}
                    step=${step}


*/
const ShoppingList = ({
  shoppingList,
  fetchShoppingList,
  isLoadingShoppingList,
  ...props
}) => {
  // console.log(shoppingList);
  const [shoppingItems, setShoppingItems] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    shoppingList
  );
  useEffect(() => {
    isLoadingShoppingList();
    fetchShoppingList();
    setShoppingItems(shoppingList);
  }, []);
  useEffect(() => {
    isLoadingShoppingList();
    fetchShoppingList();
    setShoppingItems(shoppingList);
  }, [shoppingList, fetchShoppingList]);

  const handleChange = (e, index, name, unit, original) => {
    const newValue = Number(e.target.value);
    setShoppingItems({ [index]: { amount: newValue, name, unit, original } });
  };
  const handleDelete = (index) => {
    // const newShoppingItems = { ...shoppingItems };
    // delete newShoppingItems[index];
    delete shoppingItems[index];
    setShoppingItems(shoppingItems);
  };
  return (
    <ShoppingListStyles>
      <Heading2>My Shopping List</Heading2>
      {shoppingList.length > 0 ? (
        <>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              console.log(shoppingItems);
            }}
          >
            <ul>
              {shoppingList && //    {/* shoppingList.map(({ amount, name, unit, original }, index) => { */}
                // TODO - find a better way to calc step
                Object.keys(shoppingItems).length !== 0 &&
                Object.entries(shoppingItems).map((item) => {
                  {/* console.log(item); */}
                  const { amount, unit, name, original } = item[1];
                  let step;
                  if (unit < 10) {
                    step = unit % 1;
                  } else if (unit > 10) {
                    step = Math.ceil(unit / 10);
                  }

                  return (
                    <li key={item[0]}>
                      <div>
                        <input
                          type="number"
                          name={name}
                          value={shoppingItems[item[0]].amount}
                          onChange={(e) =>
                            handleChange(e, item[0], name, unit, original)
                          }
                          min="0"
                          step={step}
                        />
                        <p>{unit}</p>
                      </div>
                      <p>{name}</p>
                      <button onClick={() => handleDelete(item[0])}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </li>
                  );
                })}
            </ul>
            <Button type="submit">Create List</Button>
          </form>
          <Button>
            {" "}
            <i className="fas fa-trash-alt"></i>Delete all{" "}
          </Button>
        </>
      ) : (
        <div>
          <h3>Your shopping list is empty</h3>
        </div>
      )}
    </ShoppingListStyles>
  );
};

const mapStateToProps = ({ shoppingLists }) => {
  // console.log(shoppingList)
  return {
    shoppingList: shoppingLists.shoppingList,
    isLoading: shoppingLists.isLoading,
  };
};

export default connect(mapStateToProps, {
  fetchShoppingList,
  isLoadingShoppingList,
})(ShoppingList);
