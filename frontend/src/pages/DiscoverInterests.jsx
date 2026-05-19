import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DiscoverInterests.css";

export default function DiscoverInterests() {
  const navigate = useNavigate();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const token = localStorage.getItem("token");
    const sessionUser = localStorage.getItem("user");

    if (!token || !sessionUser) {
      navigate("/login");
      return;
    }

    const currentUser = JSON.parse(sessionUser);

    const welcomeMsg = document.getElementById("welcomeMsg");
    if (welcomeMsg) {
      welcomeMsg.textContent = `Hey ${currentUser.name.split(" ")[0]}! Let's personalise your Dostiship experience 🎉`;
    }

    function showNotification(message, type = "success") {
      const n = document.getElementById("notification");
      if (!n) return;
      n.textContent = message;
      n.className = "notification " + type;
      n.style.display = "block";
      setTimeout(() => { n.style.display = "none"; }, 3000);
    }

    const maxSelections = 5;
    let selectedInterests = new Set();
    const priorityList = document.getElementById("priorityList");

    // ── CONNECTION TYPE TOGGLE ──
    document.querySelectorAll(".connection-option").forEach((option) => {
      option.addEventListener("click", function () {
        document.querySelectorAll(".connection-option")
          .forEach((o) => o.classList.remove("active"));
        this.classList.add("active");
        const type = this.dataset.type;
        document.querySelectorAll(".interest-card").forEach((card) => {
          card.style.display =
            card.classList.contains("custom-interest") ||
            card.dataset.type === type
              ? "block"
              : "none";
        });
      });
    });

    // ── INTEREST CARD CLICK ──
    document.querySelectorAll(".interest-card").forEach((card) => {
      card.addEventListener("click", function () {
        if (this.classList.contains("custom-interest")) {
          document.getElementById("customInterestModal").style.display = "flex";
          return;
        }
        const interest = this.dataset.interest;
        if (selectedInterests.has(interest)) {
          this.classList.remove("selected");
          selectedInterests.delete(interest);
          removePriorityItem(interest);
        } else if (selectedInterests.size < maxSelections) {
          this.classList.add("selected");
          selectedInterests.add(interest);
          addPriorityItem(
            interest,
            this.querySelector("h3").textContent,
            this.querySelector(".interest-icon i").className
          );
        } else {
          showNotification(`You can select up to ${maxSelections} interests.`, "error");
        }
      });
    });

    function addPriorityItem(interest, name, iconClass) {
      const item = document.createElement("div");
      item.className = "priority-item";
      item.setAttribute("draggable", "true");
      item.setAttribute("data-interest", interest);
      item.innerHTML = `
        <i class="fas fa-grip-lines drag-handle"></i>
        <div class="interest-icon" style="width:40px;height:40px;font-size:16px;flex-shrink:0;margin-right:12px;">
          <i class="${iconClass}"></i>
        </div>
        <div class="priority-info">
          <h4>${name}</h4>
          <p>Priority interest</p>
        </div>
        <div class="priority-actions">
          <button class="priority-btn remove-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
      priorityList.appendChild(item);
      bindPriorityEvents(item);
    }

    function bindPriorityEvents(item) {
      item.querySelector(".remove-btn").addEventListener("click", () =>
        removePriorityItem(item.dataset.interest)
      );
      item.addEventListener("dragstart", () => item.classList.add("dragging"));
      item.addEventListener("dragend",   () => item.classList.remove("dragging"));
      item.addEventListener("dragover",  (e) => e.preventDefault());
      item.addEventListener("drop", function (e) {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        if (dragging !== item) {
          const all  = [...priorityList.querySelectorAll(".priority-item")];
          const dIdx = all.indexOf(dragging);
          const tIdx = all.indexOf(item);
          priorityList.insertBefore(dragging, dIdx < tIdx ? item.nextSibling : item);
        }
      });
    }

    function removePriorityItem(interest) {
      const item = priorityList.querySelector(`[data-interest="${interest}"]`);
      if (item) item.remove();
      const card = document.querySelector(`.interest-card[data-interest="${interest}"]`);
      if (card) card.classList.remove("selected");
      selectedInterests.delete(interest);
    }

    // ── CUSTOM INTEREST ──
    document.getElementById("addCustom").addEventListener("click", function () {
      const val = document.getElementById("customInterestInput").value.trim();
      if (!val) { showNotification("Please enter an interest.", "error"); return; }
      if (selectedInterests.size >= maxSelections) {
        showNotification(`Max ${maxSelections} interests allowed.`, "error"); return;
      }
      const id = `custom-${val.toLowerCase().replace(/\s+/g, "-")}`;
      if (selectedInterests.has(id)) { showNotification("Already added!", "error"); return; }

      selectedInterests.add(id);
      const newCard = document.createElement("div");
      newCard.className = "interest-card selected";
      newCard.dataset.interest = id;
      newCard.dataset.type = document.querySelector(".connection-option.active").dataset.type;
      newCard.innerHTML = `
        <div class="interest-icon"><i class="fas fa-star"></i></div>
        <h3>${val}</h3>
        <p>Custom interest</p>`;
      document.querySelector(".interests-grid")
        .insertBefore(newCard, document.querySelector(".custom-interest"));
      newCard.addEventListener("click", function () {
        removePriorityItem(id);
        this.remove();
      });
      addPriorityItem(id, val, "fas fa-star");
      document.getElementById("customInterestModal").style.display = "none";
      document.getElementById("customInterestInput").value = "";
    });

    document.getElementById("cancelCustom").addEventListener("click", () => {
      document.getElementById("customInterestModal").style.display = "none";
      document.getElementById("customInterestInput").value = "";
    });

    // ── SAVE INTERESTS ──
    document.getElementById("saveInterestsBtn").addEventListener("click", async function () {
      if (selectedInterests.size === 0) {
        showNotification("Please select at least one interest!", "error");
        return;
      }

      // Get ordered interest names from the priority list (respects drag order)
      const interestNames = [...priorityList.querySelectorAll(".priority-item")].map(
        (item) => item.querySelector("h4").textContent
      );

      this.disabled = true;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

      try {
        // ⚠️ Fixed: was "/api/auth/interests" (relative) → now absolute URL
        const res = await fetch("http://localhost:5000/api/auth/interests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ interests: interestNames }),
        });

        const data = await res.json();

        if (res.ok) {
          // ⚠️ Critical fix: update localStorage user with the returned updated user
          // Without this, localStorage.user.interests stays [] and login
          // always redirects back to /discover-interests or /login
          localStorage.setItem("user", JSON.stringify(data.user));

          showNotification("Interests saved! Taking you to your feed 🎉", "success");
          setTimeout(() => navigate("/dashboard", { replace: true }), 1500);
        } else {
          showNotification(data.error || "Something went wrong!", "error");
          this.disabled = false;
          this.innerHTML = '<i class="fas fa-save"></i> Save & Continue';
        }
      } catch {
        showNotification(
          "Cannot connect to server. Make sure backend is running on port 5000.",
          "error"
        );
        this.disabled = false;
        this.innerHTML = '<i class="fas fa-save"></i> Save & Continue';
      }
    });

    // ── SCROLL REVEAL ──
    const revealElements = document.querySelectorAll(".interests-grid, .priority-section");
    function revealOnScroll() {
      revealElements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100)
          el.classList.add("reveal");
      });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, [navigate]);

  return (
    <>
      <header>
        <div className="logo">Dosti<span>शिप</span></div>
      </header>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <div className="step-indicator">
        Step <span>2 of 3</span> — Pick your interests to find your people
      </div>

      <div className="interests-container">
        <div className="welcome-msg" id="welcomeMsg">
          Welcome! Let's personalise your Dostiship experience 🎉
        </div>

        <div className="page-header">
          <h1 className="page-title">Discover Your Interests</h1>
          <p className="page-subtitle">
            Select up to 5 interests to find like-minded people and get better
            friend recommendations
          </p>
        </div>

        <div className="connection-options">
          <div className="connection-option active" data-type="individual">
            <i className="fas fa-user-friends"></i>
            <div>Individual Friends</div>
          </div>
          <div className="connection-option" data-type="group">
            <i className="fas fa-users"></i>
            <div>Friend Groups</div>
          </div>
        </div>

        <div className="interests-grid">
          <div className="interest-card" data-interest="drawing" data-type="individual">
            <div className="interest-icon"><i className="fas fa-paint-brush"></i></div>
            <h3>Drawing</h3>
            <p>Sketching, painting, digital art</p>
          </div>
          <div className="interest-card" data-interest="music" data-type="individual">
            <div className="interest-icon"><i className="fas fa-music"></i></div>
            <h3>Music</h3>
            <p>Listening, playing instruments</p>
          </div>
          <div className="interest-card" data-interest="photography" data-type="individual">
            <div className="interest-icon"><i className="fas fa-camera"></i></div>
            <h3>Photography</h3>
            <p>Capturing moments</p>
          </div>
          <div className="interest-card" data-interest="theater" data-type="individual">
            <div className="interest-icon"><i className="fas fa-theater-masks"></i></div>
            <h3>Theater</h3>
            <p>Drama, acting, plays</p>
          </div>
          <div className="interest-card" data-interest="gaming" data-type="individual">
            <div className="interest-icon"><i className="fas fa-gamepad"></i></div>
            <h3>Gaming</h3>
            <p>Video games, board games</p>
          </div>
          <div className="interest-card" data-interest="movies" data-type="individual">
            <div className="interest-icon"><i className="fas fa-film"></i></div>
            <h3>Movies</h3>
            <p>Watching, discussing films</p>
          </div>
          <div className="interest-card" data-interest="reading" data-type="individual">
            <div className="interest-icon"><i className="fas fa-book"></i></div>
            <h3>Reading</h3>
            <p>Books, novels, comics</p>
          </div>
          <div className="interest-card" data-interest="cooking" data-type="individual">
            <div className="interest-icon"><i className="fas fa-utensils"></i></div>
            <h3>Cooking</h3>
            <p>Recipes, food experiments</p>
          </div>
          <div className="interest-card" data-interest="running" data-type="group" style={{ display: "none" }}>
            <div className="interest-icon"><i className="fas fa-running"></i></div>
            <h3>Running</h3>
            <p>Jogging, marathons</p>
          </div>
          <div className="interest-card" data-interest="basketball" data-type="group" style={{ display: "none" }}>
            <div className="interest-icon"><i className="fas fa-basketball-ball"></i></div>
            <h3>Basketball</h3>
            <p>Playing, watching</p>
          </div>
          <div className="interest-card" data-interest="swimming" data-type="group" style={{ display: "none" }}>
            <div className="interest-icon"><i className="fas fa-swimmer"></i></div>
            <h3>Swimming</h3>
            <p>Pool, open water</p>
          </div>
          <div className="interest-card" data-interest="cycling" data-type="group" style={{ display: "none" }}>
            <div className="interest-icon"><i className="fas fa-biking"></i></div>
            <h3>Cycling</h3>
            <p>Road, mountain biking</p>
          </div>
          <div className="interest-card" data-interest="coding" data-type="group" style={{ display: "none" }}>
            <div className="interest-icon"><i className="fas fa-code"></i></div>
            <h3>Coding</h3>
            <p>Programming, development</p>
          </div>
          <div className="interest-card" data-interest="languages" data-type="group" style={{ display: "none" }}>
            <div className="interest-icon"><i className="fas fa-language"></i></div>
            <h3>Languages</h3>
            <p>Learning new languages</p>
          </div>
          <div className="interest-card" data-interest="science" data-type="group" style={{ display: "none" }}>
            <div className="interest-icon"><i className="fas fa-microscope"></i></div>
            <h3>Science</h3>
            <p>Discoveries, experiments</p>
          </div>
          <div className="interest-card" data-interest="finance" data-type="group" style={{ display: "none" }}>
            <div className="interest-icon"><i className="fas fa-chart-line"></i></div>
            <h3>Finance</h3>
            <p>Investing, trading</p>
          </div>
          <div className="interest-card" data-interest="hiking" data-type="group" style={{ display: "none" }}>
            <div className="interest-icon"><i className="fas fa-hiking"></i></div>
            <h3>Hiking</h3>
            <p>Nature trails, camping</p>
          </div>
          <div className="interest-card" data-interest="travel" data-type="group" style={{ display: "none" }}>
            <div className="interest-icon"><i className="fas fa-plane"></i></div>
            <h3>Travel</h3>
            <p>Exploring new places</p>
          </div>
          <div className="interest-card" data-interest="pets" data-type="group" style={{ display: "none" }}>
            <div className="interest-icon"><i className="fas fa-dog"></i></div>
            <h3>Pets</h3>
            <p>Dogs, cats, animals</p>
          </div>
          <div className="interest-card custom-interest" data-interest="custom">
            <div className="interest-icon"><i className="fas fa-plus"></i></div>
            <h3>Add Custom</h3>
            <p>Create your own interest</p>
          </div>
        </div>

        <div className="priority-section">
          <div className="priority-header">
            <h3 className="priority-title">Set Your Priority Interests</h3>
            <p className="priority-subtitle">
              Drag to reorder your top interests. These will be used to find your best matches.
            </p>
          </div>
          <div className="priority-list" id="priorityList"></div>
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary" id="saveInterestsBtn">
            <i className="fas fa-save"></i> Save &amp; Continue
          </button>
        </div>
      </div>

      <div className="modal" id="customInterestModal">
        <div className="modal-content">
          <h2>Add Custom Interest</h2>
          <input
            type="text"
            id="customInterestInput"
            placeholder="Enter your custom interest"
          />
          <div>
            <button className="btn btn-outline" id="cancelCustom">Cancel</button>
            <button className="btn btn-primary" id="addCustom">Add</button>
          </div>
        </div>
      </div>

      <div className="notification" id="notification"></div>
    </>
  );
}