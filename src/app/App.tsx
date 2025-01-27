import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts and pages
import RootLayout from "../shared/ui/RootLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile";
import FlashcardMenu from "../pages/FlashcardMenu";
import CreateFlashcards from "../pages/CreateFlashcards/CreateFlashcards";
import MyFlashcards from "../pages/MyFlashcards/MyFlashcards";
import FlashcardSet from "../pages/FlashcardSet/FlashcardSet";
import PopularFlashcards from "../pages/PopularFlashcards/PopularFlashcards";
import PopularFlashcardSet from "../pages/PopularFlashcards/PopularFlashcardSet";
import Favorites from "../pages/Favorites/Favorites";
// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/flashcards" element={<FlashcardMenu />} />
      <Route path="/create-flashcards" element={<CreateFlashcards />} />
      <Route path="/my-flashcards" element={<MyFlashcards />} />
      <Route path="/flashcard-set" element={<FlashcardSet />} />
      <Route path="/my-flashcards/:setId" element={<FlashcardSet />} />
      <Route path="/favorites" element={<Favorites />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
