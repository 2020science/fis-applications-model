// Direct scenario loading implementation
document.addEventListener('DOMContentLoaded', function() {
  // Add direct event listeners to scenario buttons
  document.getElementById('optimistic-btn').addEventListener('click', function() {
    directLoadScenario('optimistic');
  });
  
  document.getElementById('realistic-btn').addEventListener('click', function() {
    directLoadScenario('realistic');
  });
  
  document.getElementById('pessimistic-btn').addEventListener('click', function() {
    directLoadScenario('pessimistic');
  });
});

// Direct implementation of scenario loading that bypasses the onclick attribute
function directLoadScenario(scenario) {
  console.log(`Direct loading scenario: ${scenario}`);
  const data = scenarios[scenario];
  
  if (!data) {
    console.error(`Scenario data not found for: ${scenario}`);
    return;
  }
  
  // Update all input values
  for (const [key, value] of Object.entries(data)) {
    const element = document.getElementById(key);
    if (element) {
      console.log(`Setting ${key} to ${value}`);
      element.value = value;
      
      // Update displayed value for sliders
      if (element.type === 'range') {
        const valueElement = document.getElementById(`${element.id}-value`);
        if (valueElement) {
          // Check if this is a numerical slider (not percentage)
          const isNumerical = ['high-school-visits', 'digital-campaigns', 'info-sessions', 
                              'similar-programs', 'university-events', 'college-events'].includes(element.id);
          
          if (isNumerical) {
            valueElement.textContent = value;
          } else {
            valueElement.textContent = `${value}%`;
          }
        }
      }
      
      // Handle select elements
      if (element.tagName === 'SELECT') {
        // Trigger change event for select elements
        const event = new Event('change');
        element.dispatchEvent(event);
      }
    } else {
      console.log(`Element not found: ${key}`);
    }
  }
  
  // Update the model
  updateModel();
}
