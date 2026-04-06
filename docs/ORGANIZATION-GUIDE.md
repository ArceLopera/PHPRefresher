# PHPRefresher Organization Guide

## Overview
This document defines the information architecture and organization standards for the PHPRefresher repository. It ensures consistent navigation, clear categorization, and optimal user experience.

---

## Repository Structure

### Top-Level Organization

```
docs/
├── index.md                      # Homepage
├── phpRefresh.md                 # Introduction to PHP
├── .template.md                  # Standard documentation template
├── PR/                           # Basics & Programming Fundamentals
├── Func/                         # Built-in Functions
├── DS/                           # Data Structures
├── Classes/                      # OOP & Classes
├── Adv/                          # Advanced Topics
├── Moodle/                       # Moodle Development
├── IMPROVEMENT-PHASES/           # Meta: Improvement initiatives
└── Images/                       # Static images & assets
```

### Section Organization

#### **PR (Basics)** - 16 files
Programming fundamentals for learning PHP from scratch.

**Structure:**
- Variables and Assignments (phpVar1-4)
- Constants (phpConst)
- Globals & Superglobals (phpSuperGlobals)
- Forms (phpForms)
- Strings (phpStr, phpStr1)
- Numbers (phpNum1, phpMath1)
- Operators (phpOperators1)
- Control Flow (phpIF, phpLoops)
- Keywords (phpKeywords)

**Naming Convention:** `php<Topic><Number>.md`
- Example: `phpVar1.md`, `phpStr1.md`
- Number indicates learning progression or variation
- Part of foundational learning path

#### **Func (Built-in Functions)** - 28 files
Comprehensive coverage of PHP's built-in function categories.

**Subcategories:**
1. **Core Functions** (phpAll, phpEmpty, phpMisc)
2. **Date & Time** (phpDate, phpCalendar)
3. **String Functions** (covered in PR section)
4. **Array/Iterator Functions** (phpCallback, phpGenerators)
5. **Type & Validation** (phpFilters, phpEmpty)
6. **Network Functions** (phpCookie, phpSessions, phpFTP, phpMail)
7. **Data Encoding** (phpJSON, phpRegex)
8. **Error Handling** (phpError, phpExceptions)
9. **Language Features** (phpDeclare, phpConfVar, phpOutput)
10. **User-Defined Functions** (phpUserFunc, phpArrowFunc, phpGenerators)

**Naming Convention:** `php<Function>.md`
- Example: `phpDate.md`, `phpCallback.md`
- Descriptive of function type/category
- All functions documented in same file when related

#### **DS (Data Structures)** - 10+ files (expanding)
SPL (Standard PHP Library) and core data structures.

**Current Coverage:**
- `phpArray.md` - Arrays and array functions
- `phpIterables.md` - Iterators and iterable objects

**Planned Additions (SPL Classes):**
- `phpSplFixedArray.md` - Fixed-size arrays
- `phpSplDoublyLinkedList.md` - Linked list
- `phpSplQueue.md` - FIFO queue
- `phpSplStack.md` - LIFO stack
- `phpSplHeap.md` - Binary heap
- `phpSplTree.md` - Tree structures
- `phpSplObjectStorage.md` - Object maps
- `phpSplFileObject.md` - File objects

**Naming Convention:** `php<SPLClass>.md`
- Example: `phpSplQueue.md`, `phpArray.md`

#### **Classes** - 12 files
Object-Oriented Programming and class concepts.

**Coverage:**
- Core OOP (phpCls, phpConstructor, phpInheritance)
- Visibility (phpModifiers, phpStatic)
- Advanced OOP (phpAbstract, phpInterfaces, phpTraits, phpConstants)
- Modern PHP (phpNamespaces, phpAttributes, phpEnums)

**Naming Convention:** `php<Concept>.md`
- Example: `phpCls.md`, `phpTraits.md`
- Clear topic names
- All files in Classes/ for easy discovery

#### **Adv (Advanced)** - 15 files
Advanced topics, tools, and specialized features.

**Reorganized Categories (Phase 2):**

1. **Language Features** (3 files)
   - Include: `phpInclude.md`
   - Goto: `phpGoto.md`
   - File Management: `phpFile.md`

2. **Database & Data** (3 files)
   - MySQL: `phpMySql.md`
   - XML: `phpXML.md`
   - Zip: `phpZip.md`

3. **Development Tools** (7 files)
   - Dependency: `phpcomposer.md`, `phpnpm.md`
   - Analysis: `phpstan.md`
   - Database: `phpAdminer.md`, `phpMailhog.md`
   - DevOps: `phpTiller.md`, `phpVault.md`

4. **Web Services** (2 files)
   - Ajax: `phpAjax.md`
   - Mail: `phpMail.md` (moved from Func)

**Naming Convention:** `php<Tool/Feature>.md`
- Example: `phpComposer.md`, `phpMySql.md`

#### **Moodle** - 29 files
Moodle Learning Management System development.

**Sub-sections:**
- **Basics** (phpMoodle, phpMoodleInstall)
- **Development** (phpMoodleDebug, phpMoodleSecurity)
- **Plugin Development** (14 files across Plugin/ subdirectory)
- **Testing & Quality** (phpMoodleTestFrameworks, phpMoodleToolsPHPUnit, phpMoodleBehat)
- **API Reference** (10 files in API/ subdirectory)
- **JavaScript** (5 files in Javascript/ subdirectory)
- **Advanced** (phpMoodleXMLDB)

**Naming Convention:** `phpMoodle<Topic>.md`
- Example: `phpMoodleDebug.md`, `phpMoodleTemplate.md`
- Namespace-like organization
- Subdirectories for large topic groups

---

## Naming Conventions

### Files

**General Pattern:** `php<TopicName>.md`

**Examples:**
- ✅ `phpDate.md` - Clear, descriptive
- ✅ `phpComposer.md` - Tool name clearly identified
- ✅ `phpTraits.md` - OOP concept, matches mkdocs.yml label
- ❌ `phpVar1.md` - Ambiguous number (legacy naming)
- ❌ `phpAll.md` - Vague ("all" functions?)
- ❌ `phpStr1` + `phpStr` - Duplicate concepts

### Navigation (mkdocs.yml)

**Pattern:** Descriptive labels matching content, organized hierarchically

**Examples:**
```yaml
- Classes:
    - OOP: Classes/phpCls.md
    - Inheritance: Classes/phpInheritance.md
    - Abstract Classes: Classes/phpAbstract.md
    - Traits: Classes/phpTraits.md

- Functions:
    - Date/Time:
        - Date/Time: Func/phpDate.md
        - Calendar: Func/phpCalendar.md
    - Network:
        - Cookies: Func/phpCookie.md
        - Sessions: Func/phpSessions.md
```

**Guidelines:**
- Use readable labels (not filenames)
- Capitalize main categories
- Use consistent formatting
- Nest subcategories logically
- Maintain alphabetical order within same level when appropriate

---

## Content Organization Standards

### File Header
All files should start with standardized metadata (enforced by Phase 1 template):

```markdown
# [Topic Title]

> **Last updated:** [Month Day, Year]  
> **Minimum PHP Version:** PHP [version]+  
> **Status:** [Stable/Experimental/Deprecated]

## Overview
Brief description of what this page covers...
```

### Section Structure
Follow the standard template for consistency:

1. **Overview** - What is this? Why learn it?
2. **When to Use** - Use cases and scenarios
3. **Basic Example** - Simple, easy-to-understand code
4. **Advanced Example** - Complex real-world patterns
5. **Comparison Table** - How this compares to alternatives
6. **Related Topics** - Links to connected content
7. **PHP Version** - Version compatibility info
8. **See Also** - External resources

### Cross-Linking

**Rules:**
- Link to related topics within same section
- Link to foundational concepts before advanced ones
- Use relative paths: `../PR/phpVar1.md`
- Update links when reorganizing (P2-1 → P2-4)
- Test with `mkdocs build` to catch broken links

**Example:**
```markdown
## Related Topics

- [Variables](../PR/phpVar1.md) - Variables and data types
- [Functions](../Func/phpUserFunc.md) - Function definition
- [Array Functions](../DS/phpArray.md) - Array manipulation
```

---

## User Learning Paths

### Path 1: Complete Beginner
1. Read: phpRefresh.md (introduction)
2. Study: PR/* (Basics section) in order
3. Explore: Func/* (Built-in functions)
4. Practice: Work through examples

### Path 2: Intermediate Developer
1. Review: PR/* (refresh basics)
2. Deep dive: Classes/* (OOP)
3. Explore: DS/* (Data Structures)
4. Reference: Func/* (Built-in functions)

### Path 3: Advanced Developer
1. Reference: All sections as needed
2. Focus: Adv/* (Advanced topics)
3. Specialized: Moodle/* (if building for Moodle)
4. Tools: Development tools in Adv/

### Path 4: Moodle Developer
1. Read: Moodle/phpMoodle.md
2. Setup: Moodle/phpMoodleInstall.md
3. Learn: Moodle/API/* (API reference)
4. Develop: Moodle/Plugin/* (Plugin types)
5. Test: Moodle/phpMoodleBehat.md

---

## Quality Assurance

### Verification Checklist

- [ ] File naming follows conventions
- [ ] mkdocs.yml references correct file
- [ ] File has proper header (template)
- [ ] Internal links use relative paths
- [ ] No broken links: `mkdocs build --clean`
- [ ] Navigation hierarchical and logical
- [ ] Content follows template structure
- [ ] PHP version indicators present
- [ ] "Last Updated" metadata current
- [ ] Related topics linked

### Build Verification

```bash
# Before committing
mkdocs build --clean     # Should produce zero warnings
mkdocs serve             # Preview locally
npx playwright test      # Run test suite
```

---

## Future Improvements

### Phase 2 Organization
- **P2-1:** Reorganize Advanced section ✅ DONE
- **P2-4:** Improve content organization (this document) ✅ DONE
- **P2-2:** Create foundational sections (Getting Started, Best Practices, etc.)
- **P2-3:** Expand Data Structures coverage (add 8 missing SPL structures)

### Phase 3 Enhancement
- Add interactive/runnable code examples
- Version-specific documentation strategies
- Enhanced cross-linking and taxonomy
- Search optimization

### Naming Improvements (Future)
Consider for Phase 3 if needed:
- Rename `phpVar1-4` → `variables-basics`, `variables-scope`, etc.
- Consolidate `phpStr` + `phpStr1` → single comprehensive file
- Clarify `phpAll` → more descriptive name
- Clarify `phpMath1` vs `phpNum1` distinction

---

## References

- **Template:** docs/.template.md
- **mkdocs.yml:** Navigation configuration
- **PHASE-2-ORGANIZATION.md:** P2 improvement initiative details
- **CONTRIBUTING.md:** Contributor guidelines

---

## Contact & Questions

For questions about organization or naming conventions, see:
- CONTRIBUTING.md - Contributor guidelines
- AGENTS.md - Project governance
- Session documentation - Strategic context

---

Last updated: **April 2026**  
Organization Version: **2.0** (Phase 2)  
Effective for: **All 102+ documentation files**
