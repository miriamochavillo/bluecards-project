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
import CreateFlashcards from "../pages/CreateFlashcards";
import MyFlashcards from "../pages/MyFlashcard/MyFlashcards";
import FlashcardSet from "../pages/FlashcardSet/FlashcardSet";
import PopularFlashcards from "../pages/Dashboard/PopularFlashcards/PopularFlashcards";
import PopularFlashcardSet from "../pages/Dashboard/PopularFlashcards/PopularFlashcardSet";
// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/flashcards" element={<FlashcardMenu />} />
      <Route path="/create-flashcards" element={<CreateFlashcards />} />
      <Route path="/my-flashcards" element={<MyFlashcards />} />
      <Route path="/popular-flashcards" element={<PopularFlashcards />} />
      <Route
        path="/popular-flashcards/:setId"
        element={<PopularFlashcardSet />}
      />
      <Route path="/flashcard-set" element={<FlashcardSet />} />
      <Route path="/my-flashcards/:setId" element={<FlashcardSet />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
