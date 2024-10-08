/**
 * @swagger
 * components:
 *   schemas:
 *     TActivity:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *       required:
 *         - name
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TFacilities:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *       required:
 *         - name
 */

/**
 * @swagger
 * /turf/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: ID of the turf
 */

/**
 * @swagger
 * tags:
 *   name: Turf
 *   description: API endpoints for managing turfs
 */

/**
 * @swagger
 * /turf/{id}:
 *   get:
 *     summary: Get a single turf by ID
 *     tags: [Turf]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the turf
 *     responses:
 *       '200':
 *         description: A single turf
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TTurf'
 */

/**
 * @swagger
 * /turf/{id}:
 *   patch:
 *     summary: Update a turf by ID
 *     tags: [Turf]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the turf
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TTurf'
 *     responses:
 *       '200':
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TTurf'
 */

/**
 * @swagger
 * /turf/create-turf:
 *   post:
 *     summary: Create a new turf
 *     tags: [Turf]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TTurf'
 *     responses:
 *       '200':
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TTurf'
 */

/**
 * @swagger
 * /turf:
 *   get:
 *     summary: Get all turfs
 *     tags: [Turf]
 *     responses:
 *       '200':
 *         description: A list of turfs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TTurf'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TTurf:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         location:
 *           type: string
 *         contactNo:
 *           type: string
 *         owner:
 *           type: string
 *         address:
 *           type: string
 *         facilities:
 *           type: string
 *         turfImage:
 *           type: array
 *           items:
 *             type: string
 *         activity:
 *           type: string
 *         status:
 *           type: string
 *         isDeleted:
 *           type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Facilities
 *   description: API endpoints for managing facilities
 */

/**
 * @swagger
 * /facilities:
 *   get:
 *     summary: Get all facilities
 *     tags: [Facilities]
 *     responses:
 *       '200':
 *         description: A list of facilities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TFacilities'
 */

/**
 * @swagger
 * /facilities:
 *   post:
 *     summary: Create a new facility
 *     tags: [Facilities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TFacilities'
 *     responses:
 *       '200':
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TFacilities'
 */

/**
 * @swagger
 * /facilities/{id}:
 *   patch:
 *     summary: Update a facility by ID
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the facility
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TFacilities'
 *     responses:
 *       '200':
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TFacilities'
 *   delete:
 *     summary: Delete a facility by ID
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the facility
 *     responses:
 *       '200':
 *         description: Successfully deleted
 */

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: API endpoints for managing activities
 */

/**
 * @swagger
 * /activity:
 *   get:
 *     summary: Get all activities
 *     tags: [Activities]
 *     responses:
 *       '200':
 *         description: A list of activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TActivity'
 */

/**
 * @swagger
 * /activity:
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TActivity'
 *     responses:
 *       '200':
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TActivity'
 */

/**
 * @swagger
 * /activity/{id}:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the activity
 */

/**
 * @swagger
 * /activity/{id}:
 *   patch:
 *     summary: Update an activity by ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the activity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TActivity'
 *     responses:
 *       '200':
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TActivity'
 *   delete:
 *     summary: Delete an activity by ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the activity
 *     responses:
 *       '200':
 *         description: Successfully deleted
 */

// Add similar annotations for other routes: PATCH and DELETE
