import { useState } from 'react'
import './App.css'

const RECIPES = [

  {
    name: 'Yam Turkey',
    time: '35 min',
    difficulty: 'Medium',
    required: ['Yam', 'tomato', 'onion', 'pepper', 'palm oil'],
    optional: ['Turkey', 'seasoning cube', 'bay leaf', 'vegetable oil'],
    steps: [
      'Blend tomatoes, peppers and onions into a smooth paste.',
      'Fry the blended mix in palm oil for 15–20 mins until oil floats on top.',
      'Peel of yam back, wash it and boil in pot of out water for 30 mins.',
      'Pour in water or stock, season with salt and cube.',
      'Cover tightly, cook on low heat 25–30 mins, stirring every 10 mins.',
      'Once yam is tender and water absorbed, serve with turkey!',
    ],
  },


  {
    name: 'Jollof Rice',
    time: '45 min',
    difficulty: 'Medium',
    required: ['rice', 'tomato', 'onion', 'pepper', 'palm oil'],
    optional: ['chicken', 'seasoning cube', 'bay leaf', 'vegetable oil'],
    steps: [
      'Blend tomatoes, peppers and onions into a smooth paste.',
      'Fry the blended mix in palm oil for 15–20 mins until oil floats on top.',
      'Add washed rice into the tomato base, stir well.',
      'Pour in water or stock, season with salt and cube.',
      'Cover tightly, cook on low heat 25–30 mins, stirring every 10 mins.',
      'Once rice is tender and water absorbed, serve with chicken!',
    ],
  },
  {
    name: 'Fried Plantain & Egg',
    time: '15 min',
    difficulty: 'Easy',
    required: ['plantain', 'egg'],
    optional: ['onion', 'pepper', 'vegetable oil', 'tomato'],
    steps: [
      'Peel and slice plantain diagonally into medium pieces.',
      'Fry in hot oil until golden brown on both sides, set aside.',
      'Beat eggs with diced onion, pepper and a pinch of salt.',
      'Scramble or fry the egg as preferred.',
      'Serve hot plantain alongside the egg.',
    ],
  },
  {
    name: 'Beans & Plantain',
    time: '60 min',
    difficulty: 'Easy',
    required: ['beans', 'plantain'],
    optional: ['palm oil', 'onion', 'pepper', 'crayfish'],
    steps: [
      'Wash and soak beans for 30 mins to cut cooking time.',
      'Boil beans until very soft — almost mushy (Ewa Agoyin style).',
      'Fry sliced plantain in oil until golden.',
      'Heat palm oil, darken onions, add blended pepper and crayfish.',
      'Mash beans slightly, pour sauce over.',
      'Serve beans with fried plantain on the side.',
    ],
  },
  {
    name: 'Tomato Egg Sauce & Rice',
    time: '20 min',
    difficulty: 'Easy',
    required: ['egg', 'tomato', 'onion', 'rice'],
    optional: ['pepper', 'vegetable oil', 'seasoning cube'],
    steps: [
      'Cook rice until tender, set aside.',
      'Dice tomatoes and onions. Fry onions in oil until soft.',
      'Add tomatoes and pepper, stir-fry 5 mins.',
      'Beat eggs and pour over sauce, scrambling as it cooks.',
      'Season with salt and cube.',
      'Serve over hot rice.',
    ],
  },
  {
    name: 'Pepper Soup',
    time: '40 min',
    difficulty: 'Medium',
    required: ['chicken', 'pepper', 'onion'],
    optional: ['crayfish', 'stockfish', 'seasoning cube'],
    steps: [
      'Wash and cut chicken, season with salt and onion.',
      'Add just enough water to cover.',
      'Add blended pepper, crayfish and stockfish.',
      'Cook 30 mins on medium heat until tender.',
      'Add pepper soup spice, simmer 5 more mins.',
      'Serve hot — perfect for rainy days.',
    ],
  },
  {
    name: 'Garri & Groundnut',
    time: '2 min',
    difficulty: 'Very Easy',
    required: ['garri'],
    optional: ['groundnut', 'sugar', 'coconut'],
    steps: [
      'Pour garri into a bowl.',
      'Add cold water to soak.',
      'Add sugar to taste.',
      'Add groundnuts and coconut.',
      'Stir and enjoy.',
    ],
  },
  {
    name: 'Stewed Chicken & Rice',
    time: '50 min',
    difficulty: 'Medium',
    required: ['chicken', 'tomato', 'onion', 'rice', 'palm oil'],
    optional: ['pepper', 'crayfish', 'seasoning cube'],
    steps: [
      'Boil chicken with onion and seasoning until tender. Keep the stock.',
      'Blend tomatoes, onions and pepper.',
      'Fry blended tomato in palm oil for 15 mins.',
      'Add chicken and stock, simmer 10 mins.',
      'Cook rice using leftover stock for extra flavour.',
      'Serve rice topped with the chicken stew.',
    ],
  },
  {
    name: 'Omelette',
    time: '10 min',
    difficulty: 'Very Easy',
    required: ['egg', 'onion'],
    optional: ['tomato', 'pepper', 'vegetable oil'],
    steps: [
      'Beat 2–3 eggs with a pinch of salt.',
      'Dice onion and tomato finely.',
      'Heat oil in a pan on medium.',
      'Pour egg in, scatter onion and tomato on top.',
      'Fold once edges firm up, cook 2 more mins.',
      'Serve with bread or rice.',
    ],
  },
  {
    name: 'Vegetable Soup',
    time: '30 min',
    difficulty: 'Medium',
    required: ['palm oil', 'onion', 'crayfish', 'stockfish'],
    optional: ['pepper', 'seasoning cube', 'chicken'],
    steps: [
      'Heat palm oil, fry onions until soft.',
      'Add meat or fish of choice, season and stir.',
      'Add crayfish and stockfish, add a little water.',
      'Add blended pepper, cook 10 mins.',
      'Add leafy veg (ugwu or spinach), stir.',
      'Simmer 5 mins. Serve with pounded yam, eba or rice.',
    ],
  },
]

const QUICK_ITEMS = [
  'yam',
  'rice',
  'tomato',
  'onion',
  'palm oil',
  'pepper',
  'chicken',
  'egg',
  'garri',
  'beans',
  'plantain',
  'stockfish',
  'crayfish',
]

function calcMatch(recipe, myIngredients) {
  let matched = 0
  recipe.required.forEach((r) => {
    if (myIngredients.some((h) => r.includes(h) || h.includes(r))) matched++
  })
  recipe.optional.forEach((o) => {
    if (myIngredients.some((h) => o.includes(h) || h.includes(o)))
      matched += 0.5
  })
  const total = recipe.required.length + recipe.optional.length * 0.5
  return Math.round((matched / total) * 100)
}

export default function App() {
  const [myIngredients, setMyIngredients] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [results, setResults] = useState(null)
  const [openCard, setOpenCard] = useState(null)
  const [filter, setFilter] = useState("All")

  // NEW: shopping list state
  // shoppingList = array of { name: string, recipe: string }
  // checkedItems = Set of item names the user has ticked
  const [marketList, setMarketList] = useState([])
  const [checkedItems, setCheckedItems] = useState(new Set())

  function addIngredient() {
    const val = inputValue.trim().toLowerCase()
    if (val && !myIngredients.includes(val)) {
      setMyIngredients([...myIngredients, val])
    }
    setInputValue('')
  }

//Clear Ingredients
  function clearIngredients() {
      setMyIngredients([])
    }
  

  function toggleQuick(item) {
    if (myIngredients.includes(item)) {
      setMyIngredients(myIngredients.filter((i) => i !== item))
    } else {
      setMyIngredients([...myIngredients, item])
    }
  }

  function removeIngredient(item) {
    setMyIngredients(myIngredients.filter((i) => i !== item))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addIngredient()
  }

  function findRecipes() {
    if (myIngredients.length === 0) return
    const scored = RECIPES.map((r) => ({
      ...r,
      pct: calcMatch(r, myIngredients),
    }))
      .filter((r) => r.pct > 0)
      .sort((a, b) => b.pct - a.pct)
    setResults(scored)
    setOpenCard(null)
  }

  function toggleCard(index) {
    setOpenCard(openCard === index ? null : index)
  }

  // NEW: tap a "still need" pill → add it to the shopping list
  function addToMarketList(e, ingredientName, recipeName) {
    e.stopPropagation()
    const alreadyAdded = marketList.some((i) => i.name === ingredientName)
    if (alreadyAdded) return
    setMarketList([
      ...marketList,
      { name: ingredientName, recipe: recipeName },
    ])
  }

  // NEW: tick/untick a market list item
  function toggleCheck(itemName) {
    const next = new Set(checkedItems) // copy the Set — never mutate state directly
    if (next.has(itemName)) {
      next.delete(itemName)
    } else {
      next.add(itemName)
    }
    setCheckedItems(next)
  }

  // NEW: remove all ticked items from the list
  function clearDone() {
    setMarketList(marketList.filter((i) => !checkedItems.has(i.name)))
    setCheckedItems(new Set())
  }


  function shareRecipe(e, name) {
    e.stopPropagation()
    const text = `Try this: ${name} — from Wetin I Fit Cook? 🍲`
    if (navigator.share) {
      navigator.share({ title: 'Wetin I Fit Cook?', text })
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => alert('Copied!'))
    }
  }

  // Items not yet ticked — shown in the badge counter
  const remaining = marketList.filter((i) => !checkedItems.has(i.name)).length

  return (
    <div className='app'>
      {/* HEADER */}
      <header className='header'>
        <p className='header-label'>Nigerian Kitchen</p>
        <h1 className='header-title'>Wetin I Fit Cook?</h1>
      </header>
      <div className='header-sub-row'>
        <p className='header-sub'>Add your ingredients, find your meal.</p>
        <span className='header-icon'>🍲</span>
      </div>

      {/* SEARCH PANEL */}
      <section className='panel'>
        <p className='panel-label'>Your ingredients</p>
        <div className='input-row'>
          <input
            className='ing-input'
            type='text'
            placeholder='Add an ingredient...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            data-testid='ingredient-input'
          />
          <button className='add-btn' onClick={addIngredient}  data-testid='add-ingredient-btn'> 
            Add
          </button>
          {myIngredients.length > 0 && (
          <button className='clear-all-btn' onClick={clearIngredients} data-testid='clear-ingredient-btn'>
            Clear
            </button>
          )}

        </div>

        {myIngredients.length > 0 && (
          <>
              <p className="ing-count">{myIngredients.length} ingredients added</p>
          <div className='chips'>
            {myIngredients.map((item) => (
              <div className='chip' key={item}>
                {item}
                <span
                  className='chip-remove'
                  onClick={() => removeIngredient(item)}
                >
                  ✕
                </span>
              </div>
            ))}
          </div>
          </>
        )}

        <div className='quick-section'>
          <p className='quick-label'>Common items</p>
          <div className='quick-row'>
            {QUICK_ITEMS.map((item) => (
              <button
                key={item}
                className={`q-btn ${myIngredients.includes(item) ? 'q-btn--on' : ''}`}
                onClick={() => toggleQuick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button className='cta-btn' onClick={findRecipes}  data-testid=''>
          Find recipes
        </button>
      </section>

      {/* RESULTS */}
      <section className='results'>
        {results === null && (
          <div className='empty'>
            <div className='empty-icon'>🥘</div>
            <p className='empty-title'>Nothing here yet</p>
            <p className='empty-body'>
              Add your ingredients above
              <br />
              and tap Find recipes
            </p>
          </div>
        )}

        

        {results !== null && results.length === 0 && (
          <div className='empty'>
            <div className='empty-icon'>😅</div>
            <p className='empty-title'>No matches</p>
            <p className='empty-body'>Try adding tomato, onion or rice</p>
          </div>
        )}
    
  

        {results !== null && results.length > 0 && (
          <>
            <p className='results-meta'>
              {results.length} recipe{results.length > 1 ? 's' : ''} found
            </p>

  <div className="filter-row">
      {["All", "Easy", "Medium", "Very Easy"].map((f) => (
        <button
          key={f}
          className={`filter-btn ${filter === f ? "filter-btn--active" : ""}`}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
            

            {results
            .filter((r) => filter === "All" || r.difficulty === filter)
            .map((recipe, index) => {
              const isOpen = openCard === index

              const haveReq = recipe.required.filter((x) =>
                myIngredients.some((h) => x.includes(h) || h.includes(x)),
              )
              const needReq = recipe.required.filter(
                (x) =>
                  !myIngredients.some((h) => x.includes(h) || h.includes(x)),
              )
              const haveOpt = recipe.optional.filter((x) =>
                myIngredients.some((h) => x.includes(h) || h.includes(x)),
              )
              const needOpt = recipe.optional.filter(
                (x) =>
                  !myIngredients.some((h) => x.includes(h) || h.includes(x)),
              )

              return (
                <div
                  key={recipe.name}
                  className={`card ${isOpen ? 'card--open' : ''}`}
                  onClick={() => toggleCard(index)}
                >
                  <div className='card-top'>
                    <div className='card-left'>
                      <p className='card-name'>{recipe.name}</p>
                      <div className='card-tags'>
                        <span className='tag tag-time'>{recipe.time}</span>
                        <span className='tag tag-diff'>
                          {recipe.difficulty}
                        </span>
                        <span className='tag tag-have'>
                          {haveReq.length}/{recipe.required.length} ingredients
                        </span>
                      </div>
                    </div>
                    <div className='card-right'>
                      <p className='pct-num'>{recipe.pct}%</p>
                      <p className='pct-lbl'>match</p>
                    </div>
                  </div>

                  {isOpen && (
                    <>
                      <div className='card-divider' />
                      <div
                        className='card-body'
                        onClick={(e) => e.stopPropagation()}
                      >
                        {(haveReq.length > 0 || haveOpt.length > 0) && (
                          <>
                            <p className='body-label'>You have</p>
                            <div className='pills'>
                              {haveReq.map((x) => (
                                <span key={x} className='pill pill-have'>
                                  {x}
                                </span>
                              ))}
                              {haveOpt.map((x) => (
                                <span key={x} className='pill pill-have'>
                                  {x}
                                </span>
                              ))}
                            </div>
                          </>
                        )}

                        {/* NEW: tappable "still need" pills */}
                        {needReq.length > 0 && (
                          <>
                            <p className='body-label'>
                              Still need
                              <span className='body-label-hint'>
                                {' '}
                                — tap to add to list
                              </span>
                            </p>
                            <div className='pills'>
                              {needReq.map((x) => {
                                const isAdded = marketList.some(
                                  (i) => i.name === x,
                                )
                                return (
                                  <button
                                    key={x}
                                    className={`pill-need ${isAdded ? 'pill-need--added' : ''}`}
                                    onClick={(e) =>
                                      addToMarketList(e, x, recipe.name)
                                    }
                                  >
                                    {isAdded ? '✓ ' : '+ '}
                                    {x}
                                  </button>
                                )
                              })}
                            </div>
                          </>
                        )}

                        {needOpt.length > 0 && (
                          <>
                            <p className='body-label'>Optional</p>
                            <div className='pills'>
                              {needOpt.map((x) => (
                                <span key={x} className='pill pill-opt'>
                                  {x}
                                </span>
                              ))}
                            </div>
                          </>
                        )}

                        <p className='body-label'>Steps</p>
                        <ol className='steps'>
                          {recipe.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>

                        <button
                          className='share-btn'
                          onClick={(e) => shareRecipe(e, recipe.name)}
                        >
                          Share recipe
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </>
        )}
        
      </section>

      {/* NEW: MARKET LIST — only shows when list has items */}
      {marketList.length > 0 && (
        <section className='shopping-section'>
          <div className='shopping-header'>
            <div className='shopping-title-row'>
              <span className='shopping-title'>Market list</span>
              <span className='shopping-badge'>{remaining}</span>
            </div>
            {checkedItems.size > 0 && (
              <button className='clear-btn' onClick={clearDone}>
                Clear done
              </button>
            )}
          </div>
          <div className='shopping-list'>
            {marketList.map((item) => {
              const isDone = checkedItems.has(item.name)
              return (
                <div
                  key={item.name}
                  className={`shop-item ${isDone ? 'shop-item--checked' : ''}`}
                  onClick={() => toggleCheck(item.name)}
                >
                  <div className='shop-check'>{isDone ? '✓' : ''}</div>
                  <span className='shop-name'>{item.name}</span>
                  <span className='shop-source'>for {item.recipe}</span>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
