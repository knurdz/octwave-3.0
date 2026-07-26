"use client";

import SectionAtmosphere from "@/components/SectionAtmosphere";
import SectionIllustration from "@/components/SectionIllustration";
import Reveal from "@/components/Reveal";

const ruleGroups = [
  {
    id: 1,
    title: "Team Eligibility",
    rules: [
      "All team members must be from the same university/institution.",
      "All team members must belong to the same academic batch/year.",
      "Team members may be from different faculties/departments.",
      "Team size: Minimum 1, Maximum 4 members only.",
      "Each participant may register for only one team.",
      "Individual participants without a team will be assigned to a team by the organizers, subject to availability and preferences of competitors.",
      "Each team must nominate a Team Leader who will serve as the primary contact between the team and the organizing committee.",
      "Team names must be professional and must not contain offensive, discriminatory, or inappropriate language.",
      "Participants found to be registered in more than one team will be disqualified from all related registrations.",
    ],
  },
  {
    id: 2,
    title: "Participant Requirements",
    rules: [
      "All participants must be currently enrolled undergraduate students.",
      "A valid student ID card may be requested for verification at any stage of the competition.",
      "All contact details provided including email address and phone number must be valid, active, and monitored regularly.",
    ],
  },
  {
    id: 3,
    title: "Registration Rules",
    rules: [
      "Registration must be submitted by the official Team Leader. For individual entries, the participant is responsible for their own registration.",
      "All team details must be final at the time of submission.",
      "No changes to team members or team name will be permitted after the registration deadline, unless approved in writing by the organizing committee.",
      "Late, incomplete, or incorrect submissions will not be considered.",
      "Submission of the registration form does not guarantee participation. Final acceptance is subject to eligibility verification.",
    ],
  },
  {
    id: 4,
    title: "Fair Play & Conduct",
    rules: [
      "Duplicate registrations will result in immediate disqualification of all related teams.",
      "Plagiarism, unauthorized collaboration, or any form of academic dishonesty will lead to immediate removal from the competition.",
      "Teams must work independently. No external team merging, coaching, or unauthorized assistance is permitted during the competition.",
      "All participants are expected to maintain professionalism, respect, and integrity throughout the event.",
      "The decision of the organizing committee/judges will be final and binding in all matters.",
    ],
  },
  {
    id: 5,
    title: "General Rules",
    rules: [
      "Participants must adhere to all deadlines communicated by the organizers.",
      "The organizing committee reserves the right to modify rules, schedules, or event format with prior notice.",
      "Any disputes must be submitted in writing to the organizing committee within 24 hours of the incident.",
      "The organizing committee reserves the right to disqualify any team for misconduct or violation of rules.",
    ],
  },
  {
    id: 6,
    title: "Final Agreement",
    rules: [
      "The organizing committee reserves the right to verify eligibility and authenticity of information at any stage of the competition.",
      "By submitting this registration form, all team members confirm that the information provided is accurate and agree to abide by these rules, regulations, and the final decisions of the organizers.",
    ],
  },
];

export default function Rules() {
  return (
    <section id="rules" className="section section-atmosphere">
      <SectionAtmosphere glow="bl" waves="default" parallax watermark="Rules" />
      <div className="section-inner">
        <div className="parallax-layer" data-depth="0.1">
          <Reveal className="section-header section-header-split section-header-with-illu">
            <div>
              <p className="section-label">Competition rules</p>
              <h2 className="section-title">
                Rules &amp; <span className="accent-text">guidelines</span>
              </h2>
            </div>
            <SectionIllustration variant="book" className="section-illu-header" />
          </Reveal>
        </div>

        <div className="codebook parallax-layer" data-depth="0.04">
          {ruleGroups.map((group, gi) => (
            <Reveal
              key={group.id}
              delay={gi * 60}
              as="details"
              className="codebook-chapter"
              id={`rules-ch-${group.id}`}
            >
              <summary className="codebook-summary">
                <header className="codebook-head">
                  <span className="codebook-num" aria-hidden="true">
                    {String(group.id).padStart(2, "0")}
                  </span>
                  <div className="codebook-head-copy">
                    <p className="codebook-kicker">
                      Chapter {String(group.id).padStart(2, "0")}
                    </p>
                    <h3 className="codebook-title">{group.title}</h3>
                  </div>
                </header>

                <p className="codebook-summary-meta">
                  {group.rules.length} {group.rules.length === 1 ? "rule" : "rules"}
                </p>

                <span className="dropdown-icon" aria-hidden="true" />
              </summary>

              <div className="codebook-panel">
                <ol className="codebook-list">
                  {group.rules.map((rule, ri) => (
                    <li key={ri} className="codebook-clause">
                      <span className="codebook-clause-num">
                        {group.id}.{ri + 1}
                      </span>
                      <p className="codebook-clause-text">{rule}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
