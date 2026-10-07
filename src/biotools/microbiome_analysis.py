"""
Microbiome Dysbiosis & Metabolite Modeling in Microgravity
B.Sc. & Pre-Master's Research by Abdullah Amr Maged
"""

from typing import Dict, Any
import math


class MicrogravityGutSimulator:
    """Models probiotic supplementation effects on gut microbial metabolites in simulated microgravity."""

    def __init__(self, baseline_scfa: float = 75.0, dysbiosis_factor: float = 0.42):
        self.baseline_scfa = baseline_scfa  # Short-Chain Fatty Acids (mM)
        self.dysbiosis_factor = dysbiosis_factor

    def simulate_microgravity_exposure(self, days: int) -> Dict[str, float]:
        """Calculates expected metabolite degradation during prolonged simulated microgravity."""
        decay = math.exp(-0.045 * days)
        current_scfa = self.baseline_scfa * (1.0 - self.dysbiosis_factor * (1.0 - decay))
        return {
            "exposure_days": float(days),
            "scfa_concentration_mM": round(current_scfa, 2),
            "butyrate_ratio": round(current_scfa * 0.22, 2),
            "propionate_ratio": round(current_scfa * 0.28, 2),
            "acetate_ratio": round(current_scfa * 0.50, 2),
        }

    def evaluate_probiotic_recovery(self, scfa_level: float, probiotic_dosage_cfu: float) -> Dict[str, Any]:
        """Evaluates probiotic therapeutic rescue potential on gut homeostasis."""
        efficacy = min(1.0, math.log10(probiotic_dosage_cfu) / 10.0)
        rescued_scfa = scfa_level + (self.baseline_scfa - scfa_level) * efficacy
        return {
            "pre_treatment_scfa": scfa_level,
            "post_treatment_scfa": round(rescued_scfa, 2),
            "homeostasis_restored": rescued_scfa >= (self.baseline_scfa * 0.85)
        }
