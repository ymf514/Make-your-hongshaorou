let region = "";
let cook_region = "";
let exposure_frequency = "";
let flavor_memory = "";
let emotional_association = "";
window.region = region;
window.cook_region = cook_region;
window.exposure_frequency = exposure_frequency;
window.flavor_memory = flavor_memory;
window.emotional_association = emotional_association;

const currentPage = "page-1";
let currentPageState = "page-1";

const growupOptions = document.querySelectorAll(".growup-option");
const regionSelected = document.getElementById("region-selected");

growupOptions.forEach((option) => {
	option.addEventListener("click", () => {
		region = option.dataset.region || "";
		window.region = region;

		option.classList.remove("clicked");
		void option.offsetWidth;
		option.classList.add("clicked");

		if (regionSelected) {
			regionSelected.textContent = region;
			regionSelected.classList.add("is-visible");
		}
	});
});

const cookOptions = document.querySelectorAll(".cook-option");
const cookSelected = document.getElementById("cook-selected");

cookOptions.forEach((option) => {
	option.addEventListener("click", () => {
		cook_region = option.dataset.cook || "";
		window.cook_region = cook_region;

		option.classList.remove("clicked");
		void option.offsetWidth;
		option.classList.add("clicked");

		if (cookSelected) {
			cookSelected.textContent = cook_region;
			cookSelected.classList.add("is-visible");
		}
	});
});

const frequencyOptions = document.querySelectorAll(".frequency-option");
const frequencySelected = document.getElementById("frequency-selected");

frequencyOptions.forEach((option) => {
	option.addEventListener("click", () => {
		exposure_frequency = option.dataset.frequency || "";
		window.exposure_frequency = exposure_frequency;

		option.classList.remove("clicked");
		void option.offsetWidth;
		option.classList.add("clicked");

		if (frequencySelected) {
			frequencySelected.textContent = exposure_frequency;
			frequencySelected.classList.add("is-visible");
		}
	});
});

const flavorOptions = document.querySelectorAll(".flavor-option");
const flavorSelected = document.getElementById("flavor-selected");

flavorOptions.forEach((option) => {
	option.addEventListener("click", () => {
		flavor_memory = option.dataset.flavor || "";
		window.flavor_memory = flavor_memory;

		option.classList.remove("clicked");
		void option.offsetWidth;
		option.classList.add("clicked");

		if (flavorSelected) {
			flavorSelected.textContent = flavor_memory;
			flavorSelected.classList.add("is-visible");
		}
	});
});

const meaningOptions = document.querySelectorAll(".meaning-option");
const meaningSelected = document.getElementById("meaning-selected");

meaningOptions.forEach((option) => {
	option.addEventListener("click", () => {
		emotional_association = option.dataset.meaning || "";
		window.emotional_association = emotional_association;

		option.classList.remove("clicked");
		void option.offsetWidth;
		option.classList.add("clicked");

		if (meaningSelected) {
			meaningSelected.textContent = emotional_association;
			meaningSelected.classList.add("is-visible");
		}
	});
});

// Page navigation
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const page2 = document.getElementById("page-2");
const recipeContainer = document.getElementById("recipe-container");
const feedbackModal = document.getElementById("feedback-modal");
const feedbackBody = document.getElementById("feedback-body");
const feedbackCursor = document.getElementById("feedback-cursor");
let recipeFlowToken = 0;
let feedbackFlowToken = 0;

async function goToPage2() {
	document.querySelector("main").style.opacity = "0";
	document.querySelector("main").style.visibility = "hidden";
	document.querySelector(".question-row").style.opacity = "0";
	document.querySelector(".question-row").style.visibility = "hidden";
	nextBtn.style.opacity = "0";
	nextBtn.style.visibility = "hidden";

	page2.classList.add("active");

	// Update selections on page 2
	document.getElementById("selection-region").textContent = region || "Not selected";
	document.getElementById("selection-cook").textContent = cook_region || "Not selected";
	document.getElementById("selection-frequency").textContent =
		exposure_frequency || "Not selected";
	document.getElementById("selection-flavor").textContent = flavor_memory || "Not selected";
	document.getElementById("selection-meaning").textContent =
		emotional_association || "Not selected";
	
	// Display the selected recipe
	recipeFlowToken += 1;
	const currentToken = recipeFlowToken;
	const selectedRecipe = selectRecipe();

	if (selectedRecipe === recipes.optimized) {
		await showOptimizedTypewriterThenRecipe(selectedRecipe, currentToken);
		return;
	}

	displayRecipe(selectedRecipe);
}

function backToPage1() {
	recipeFlowToken += 1;
	closeFeedbackModal();
	page2.classList.remove("active");

	document.querySelector("main").style.opacity = "1";
	document.querySelector("main").style.visibility = "visible";
	document.querySelector(".question-row").style.opacity = "1";
	document.querySelector(".question-row").style.visibility = "visible";
	nextBtn.style.opacity = "1";
	nextBtn.style.visibility = "visible";
}

async function openFeedbackModal() {
	if (!feedbackModal || !feedbackBody || !feedbackCursor) return;

	feedbackFlowToken += 1;
	const currentToken = feedbackFlowToken;
	feedbackBody.textContent = "";
	feedbackCursor.style.display = "inline";
	feedbackModal.classList.add("active");
	feedbackModal.setAttribute("aria-hidden", "false");

	const message =
		"Your response suggests that the recipe may not align with your remembered version of the dish.\n\nHowever, culinary memories are frequently influenced by:\n\n• emotional associations\n• household variations\n• childhood perception of flavor\n\nThese factors can cause personal recollections to diverge from the statistically dominant preparation methods.\n\nThis recipe reflects the most consistent regional pattern identified across multiple culinary datasets.\n\nIn other words, what you remember may represent a household variation rather than the dish itself.";

	await typewriterText(feedbackBody, message, 16);

	if (currentToken !== feedbackFlowToken) return;
	feedbackCursor.style.display = "none";
}

function closeFeedbackModal() {
	feedbackFlowToken += 1;
	if (!feedbackModal || !feedbackBody || !feedbackCursor) return;
	feedbackModal.classList.remove("active");
	feedbackModal.setAttribute("aria-hidden", "true");
	feedbackBody.textContent = "";
	feedbackCursor.style.display = "none";
}

if (feedbackModal) {
	feedbackModal.addEventListener("click", (event) => {
		if (event.target === feedbackModal) {
			closeFeedbackModal();
		}
	});
}

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && feedbackModal?.classList.contains("active")) {
		closeFeedbackModal();
	}
});

const recalculateBtn = document.getElementById("recalculate-btn");
const keepMemoryBtn = document.getElementById("keep-memory-btn");

if (recalculateBtn) {
	recalculateBtn.addEventListener("click", () => {
		backToPage1();
	});
}

if (keepMemoryBtn) {
	keepMemoryBtn.addEventListener("click", () => {
		closeFeedbackModal();
	});
}

nextBtn.addEventListener("click", goToPage2);
backBtn.addEventListener("click", backToPage1);

// Recipe definitions and selection logic
const recipes = {
	southernSweet: {
		title: "Southern Sweet Braised Pork",
		image: "./icon/jiangnan.avif",
		description: "Glossy, caramelized red-braised pork with a balanced sweetness. The meat is slowly simmered until extremely tender.",
		ingredients: `pork belly 500g
light soy sauce 2 tbsp
dark soy sauce 1 tbsp
rock sugar 40g
Shaoxing wine 2 tbsp
ginger
scallions`,
		steps: `1. Blanch pork belly
2. Caramelize rock sugar in oil
3. Add pork and coat with caramel
4. Add soy sauce and wine
5. Simmer 60-90 minutes`,
		features: `Glossy
Noticeable sweetness
Extremely tender`,
	},
	shanghai: {
		title: "Shanghai Style Hong Shao Rou",
		image: "./icon/shanghai.jpeg",
		description: "A darker, richer version of braised pork famous in Shanghai cuisine.",
		ingredients: `pork belly
rock sugar
dark soy sauce (heavy)
Shaoxing wine
star anise`,
		steps: `1. Sugar caramelization
2. Heavy soy sauce coloring
3. Slow braise 1 hour`,
		features: `Dark color
Rich soy aroma
Slightly sweet`,
	},
	hunan: {
		title: "Hunan Braised Pork",
		image: "./icon/hunan.webp",
		description: "A savory and aromatic braised pork associated with Hunan cuisine.",
		ingredients: `pork belly
soy sauce
dried chili
garlic
ginger
sugar (small amount)`,
		steps: `1. Blanch pork
2. Sear with aromatics
3. Braise with heavy soy sauce
4. Add chili for depth`,
		features: `Salty and aromatic
Slightly spicy
Rich oil aroma`,
	},
	northern: {
		title: "Northern Home Style Braise",
		image: "./icon/beifang.jpeg",
		description: "A simpler home-style braise with less sweetness and more savory flavor.",
		ingredients: `pork belly
soy sauce
garlic
ginger
cooking wine`,
		steps: `1. Blanch pork
2. Sear aromatics
3. Add soy sauce and wine
4. Simmer 45-60 minutes`,
		features: `Not very sweet
Lighter color
Home-style simplicity`,
	},
	memory: {
		title: "Slow-Simmered Memory Version",
		image: "./icon/mandun.webp",
		description: "Pork belly braised for a long time until extremely soft, evoking family memories and traditions.",
		ingredients: `pork belly
soy sauce
Shaoxing wine
ginger
scallions`,
		steps: `1. Blanch pork
2. Sear lightly
3. Add soy sauce + wine
4. Simmer 2 hours`,
		features: `Melts on tongue
Rich gelatin from skin
Deep emotional resonance`,
	},
	optimized: {
		title: "Authenticity Optimized Version",
		image: "./icon/shujv.jpeg",
		description: "This version is generated from aggregated culinary datasets representing the statistically dominant flavor profile of red-braised pork.",
		ingredients: `pork belly
soy sauce
rock sugar
Shaoxing wine
ginger
scallion`,
		steps: `1. Blanch pork
2. Caramelize sugar
3. Braise for 75 minutes`,
		features: `Balanced sweetness
Moderate soy depth
Soft but structured texture`,
	},
};

function selectRecipe() {
	// Normalize values for comparison
	const regionLower = (region || "").toLowerCase();
	const cookLower = (cook_region || "").toLowerCase();
	const frequencyLower = (exposure_frequency || "").toLowerCase();
	const flavorLower = (flavor_memory || "").toLowerCase();
	const meaningLower = (emotional_association || "").toLowerCase();

	// Recipe 1: Southern Sweet Braised Pork
	if (
		(regionLower.includes("southern") || cookLower.includes("southern")) &&
		flavorLower.includes("sweet")
	) {
		return recipes.southernSweet;
	}

	// Recipe 2: Shanghai Style
	if (
		cookLower.includes("southern") &&
		frequencyLower.includes("restaurant") &&
		(flavorLower.includes("soy") || flavorLower.includes("sweet"))
	) {
		return recipes.shanghai;
	}

	// Recipe 3: Hunan Braised Pork
	if (
		(cookLower.includes("central") || regionLower.includes("central")) &&
		flavorLower.includes("soy")
	) {
		return recipes.hunan;
	}

	// Recipe 4: Northern Home Style
	if (
		regionLower.includes("northern") &&
		(frequencyLower.includes("home") || frequencyLower.includes("occasionally")) &&
		flavorLower.includes("soy")
	) {
		return recipes.northern;
	}

	// Recipe 5: Slow-Simmered Memory
	if (
		frequencyLower.includes("often") &&
		(flavorLower.includes("fatty") ||
			meaningLower.includes("childhood") ||
			meaningLower.includes("home"))
	) {
		return recipes.memory;
	}

	// Recipe 6: Authenticity Optimized (default fallback)
	return recipes.optimized;
}

function displayRecipe(recipe) {
	const container = recipeContainer;
	if (!container) return;

	// Set background image
	container.style.setProperty("--recipe-bg-image", `url('${recipe.image}')`);

	const recipeHTML = `
		<div class="recipe">
			<div class="recipe-image-wrap">
				<img class="recipe-image" src="${recipe.image}" alt="${recipe.title}" />
			</div>
			<div class="recipe-title">${recipe.title}</div>
			<div class="recipe-subtitle">${recipe.description}</div>

			<div class="recipe-section">
				<div class="recipe-section-title">Ingredients</div>
				<div class="recipe-content">${recipe.ingredients}</div>
			</div>

			<div class="recipe-section">
				<div class="recipe-section-title">Steps</div>
				<div class="recipe-content">${recipe.steps}</div>
			</div>

			<div class="recipe-section">
				<div class="recipe-section-title">Flavor Profile</div>
				<div class="recipe-content">${recipe.features}</div>
			</div>

			<button class="recipe-feedback" id="recipe-feedback" type="button">
				Something doesn't taste right?
			</button>
		</div>
	`;

	container.innerHTML = recipeHTML;

	const feedbackBtn = document.getElementById("recipe-feedback");
	if (feedbackBtn) {
		feedbackBtn.addEventListener("click", openFeedbackModal);
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typewriterText(element, text, charDelay = 28) {
	element.textContent = "";
	for (let i = 0; i < text.length; i += 1) {
		element.textContent += text[i];
		await sleep(charDelay);
	}
}

async function showOptimizedTypewriterThenRecipe(recipe, token) {
	if (!recipeContainer) return;

	recipeContainer.innerHTML = `
		<div class="recipe-typewriter">
			<div class="typewriter-text" id="typewriter-text"></div>
		</div>
	`;

	const textEl = document.getElementById("typewriter-text");
	if (!textEl) return;

	const message =
		"Memory deviation detected.\n\nYour taste memory does not match dominant regional flavor patterns.\n\nGenerating statistically optimized version…";

	await typewriterText(textEl, message, 24);

	if (token !== recipeFlowToken) return;

	await sleep(3000);

	if (token !== recipeFlowToken) return;

	displayRecipe(recipe);
}
